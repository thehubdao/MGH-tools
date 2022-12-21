import { ModelManager } from "../../../../mongoose/ModelManager"
import { ICollection } from "./CollectionManager"

export interface IMaker {
    user?: string,
    profile_img_url?: string,
    address: string
}

export interface IOrder {
    price: number,
    eth_price: number,
    order_hash: string,
    listing_time: number,
    expiration_time: number,
    created_date: string,
    closing_date: string,
    maker: IMaker,
    symbol: string
}

export interface ISale {
    timestamp: number,
    price: number,
    eth_price: number,
    eth_usd_price: number,
    symbol: string
}

export interface IPrice {
    price: number,
    eth_price: number,
    symbol: string
}

export interface IToken {
    tokenId: string,
    collectionName: string,
    chain: string,
    listings: IOrder[],
    offers: IOrder[],
    lastSale?: ISale,
    currentPrice?: IPrice,
    bestOfferedPrice?: IPrice
}

export class TokenManager extends ModelManager<IToken> {
    constructor(collection: string) {
        super(collection, {
            tokenId: { type: String, required: true },
            collectionName: { type: String, required: true },
            chain: { type: String, required: true },
            listings: {
                type: [{
                    price: { type: Number, required: true },
                    eth_price: { type: Number, required: true },
                    order_hash: { type: String, required: true },
                    listing_time: { type: Number, required: true },
                    expiration_time: { type: Number, required: true },
                    created_date: { type: String, required: true },
                    closing_date: { type: String, required: true },
                    maker: {
                        type: {
                            user: { type: String, required: false },
                            profile_img_url: { type: String, required: false },
                            address: { type: String, required: true }
                        },
                        required: true
                    },
                    symbol: { type: String, required: true }
                }],
                required: true
            },
            offers: {
                type: [{
                    price: { type: Number, required: true },
                    eth_price: { type: Number, required: true },
                    order_hash: { type: String, required: true },
                    listing_time: { type: Number, required: true },
                    expiration_time: { type: Number, required: true },
                    created_date: { type: String, required: true },
                    closing_date: { type: String, required: true },
                    maker: {
                        type: {
                            user: { type: String, required: false },
                            profile_img_url: { type: String, required: false },
                            address: { type: String, required: true }
                        },
                        required: true
                    },
                    symbol: { type: String, required: true }
                }],
                required: true
            },
            lastSale: {
                type: {
                    timestamp: { type: Number, required: true },
                    price: { type: Number, required: true },
                    eth_price: { type: Number, required: true },
                    eth_usd_price: { type: Number, required: true },
                    symbol: { type: String, required: true }
                },
                required: false
            },
            currentPrice: {
                type: {
                    price: { type: Number, required: true },
                    eth_price: { type: Number, required: true },
                    symbol: { type: String, required: true }
                },
                required: false
            },
            bestOfferedPrice: {
                type: {
                    price: { type: Number, required: true },
                    eth_price: { type: Number, required: true },
                    symbol: { type: String, required: true }
                },
                required: false
            }
        });
    }

    public async findManyByCollection(collection: ICollection, tokenIds: string[]) {
        return await super.findMany({ collectionName: collection.name, tokenId: { $in: tokenIds } });
    }

    public async updateMany(tokens: any[], properties: string[]) {
        let writes: any[] = [];
        for (let token of tokens) {
            let datum: any = {};
            for (let property of properties)
                datum[property] = token[property];
            writes.push({
                updateOne: {
                    filter: {
                        tokenId: token.tokenId,
                        collectionName: token.collectionName
                    },
                    update: datum
                }
            });
        }
        return await super.bulkWrite(writes);
    }

    public async deleteMany(collection: string) {
        await super.deleteMany({ collectionName: collection });
    }

    public async deleteManyByTokenId(collection: ICollection, tokenId: string) {
        await super.deleteMany({ collectionName: collection.name, tokenId: tokenId });
    }

    public async countTokens(collection: ICollection) {
        return super.countDocuments({ collectionName: collection.name });
    }

    public async batchByCollection(collection: ICollection, from: number, size: number) {
        return await this.model.find({ collectionName: collection.name }).skip(from).limit(size);
    }

    public async batchListings(collection: ICollection, from: number, size: number) {
        return await this.model.find({ collectionName: collection.name, currentPrice: { $exists: true } }).skip(from).limit(size);
    }

    public async batchOffers(collection: ICollection, from: number, size: number) {
        return await this.model.find({ collectionName: collection.name, bestOfferedPrice: { $exists: true } }).skip(from).limit(size);
    }
}