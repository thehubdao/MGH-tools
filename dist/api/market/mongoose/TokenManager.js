"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TokenManager = void 0;
const itrm_tools_1 = require("itrm-tools");
class TokenManager extends itrm_tools_1.MongooseModelManager {
    constructor(collection) {
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
    findManyByCollection(collection, tokenIds) {
        return super.findMany({ collectionName: collection.name, tokenId: { $in: tokenIds } });
    }
    updateMany(tokens, properties) {
        let writes = [];
        for (let token of tokens) {
            let datum = {};
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
        return super.bulkWrite(writes);
    }
    deleteByCollection(collection) {
        return super.deleteMany({ collectionName: collection.name });
    }
    deleteManyByTokenId(collection, tokenId) {
        return super.deleteMany({ collectionName: collection.name, tokenId: tokenId });
    }
    countTokens(collection) {
        const _super = Object.create(null, {
            countDocuments: { get: () => super.countDocuments }
        });
        return __awaiter(this, void 0, void 0, function* () {
            return _super.countDocuments.call(this, { collectionName: collection.name });
        });
    }
    batchByCollection(collection, from, size) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.model.find({ collectionName: collection.name }).skip(from).limit(size);
        });
    }
    batchListings(collection, from, size) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.model.find({ collectionName: collection.name, "listings.0": { $exists: true } }).skip(from).limit(size);
        });
    }
    batchOffers(collection, from, size) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.model.find({ collectionName: collection.name, "offers.0": { $exists: true } }).skip(from).limit(size);
        });
    }
}
exports.TokenManager = TokenManager;
//# sourceMappingURL=TokenManager.js.map