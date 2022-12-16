/// <reference types="mongoose/types/aggregate" />
/// <reference types="mongoose/types/callback" />
/// <reference types="mongoose/types/collection" />
/// <reference types="mongoose/types/connection" />
/// <reference types="mongoose/types/cursor" />
/// <reference types="mongoose/types/document" />
/// <reference types="mongoose/types/error" />
/// <reference types="mongoose/types/expressions" />
/// <reference types="mongoose/types/helpers" />
/// <reference types="mongoose/types/middlewares" />
/// <reference types="mongoose/types/indexes" />
/// <reference types="mongoose/types/models" />
/// <reference types="mongoose/types/mongooseoptions" />
/// <reference types="mongoose/types/pipelinestage" />
/// <reference types="mongoose/types/populate" />
/// <reference types="mongoose/types/query" />
/// <reference types="mongoose/types/schemaoptions" />
/// <reference types="mongoose/types/schematypes" />
/// <reference types="mongoose/types/session" />
/// <reference types="mongoose/types/types" />
/// <reference types="mongoose/types/utility" />
/// <reference types="mongoose/types/validation" />
/// <reference types="mongoose/types/virtuals" />
/// <reference types="mongoose" />
/// <reference types="mongoose/types/inferschematype" />
import { ModelManager } from "../../../../mongoose/ModelManager";
import { ICollection } from "./CollectionManager";
export interface IMaker {
    user?: string;
    profile_img_url?: string;
    address: string;
}
export interface IOrder {
    price: number;
    eth_price: number;
    order_hash: string;
    listing_time: number;
    expiration_time: number;
    created_date: string;
    closing_date: string;
    maker: IMaker;
    symbol: string;
}
export interface ISale {
    timestamp: number;
    price: number;
    eth_price: number;
    eth_usd_price: number;
    symbol: string;
}
export interface IPrice {
    price: number;
    eth_price: number;
    symbol: string;
}
export interface IToken {
    tokenId: string;
    collectionName: string;
    chain: string;
    listings: IOrder[];
    offers: IOrder[];
    lastSale?: ISale;
    currentPrice?: IPrice;
    bestOfferedPrice?: IPrice;
}
export declare class TokenManager extends ModelManager<IToken> {
    constructor(collection: string);
    findManyByCollection(collection: ICollection, tokenIds: string[]): Promise<(import("mongoose").Document<unknown, any, IToken> & IToken & {
        _id: import("mongoose").Types.ObjectId;
    })[]>;
    updateMany(tokens: any[], properties: string[]): Promise<void>;
    deleteMany(collection: string): Promise<void>;
    countTokens(collection: ICollection): Promise<number>;
}
