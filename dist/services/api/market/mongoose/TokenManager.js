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
const ModelManager_1 = require("../../../../mongoose/ModelManager");
class TokenManager extends ModelManager_1.ModelManager {
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
        const _super = Object.create(null, {
            findMany: { get: () => super.findMany }
        });
        return __awaiter(this, void 0, void 0, function* () {
            return yield _super.findMany.call(this, { collectionName: collection.name, tokenId: { $in: tokenIds } });
        });
    }
    updateMany(tokens, properties) {
        const _super = Object.create(null, {
            bulkWrite: { get: () => super.bulkWrite }
        });
        return __awaiter(this, void 0, void 0, function* () {
            let writes = [];
            for (let token of tokens) {
                let datum = {};
                for (let property of properties)
                    datum[property] = token[property];
                writes.push({
                    updateOne: {
                        filter: { tokenId: token.tokenId },
                        update: datum
                    }
                });
            }
            return yield _super.bulkWrite.call(this, writes);
        });
    }
    deleteMany(collection) {
        const _super = Object.create(null, {
            deleteMany: { get: () => super.deleteMany }
        });
        return __awaiter(this, void 0, void 0, function* () {
            yield _super.deleteMany.call(this, { collectionName: collection });
        });
    }
    countTokens(collection) {
        const _super = Object.create(null, {
            countDocuments: { get: () => super.countDocuments }
        });
        return __awaiter(this, void 0, void 0, function* () {
            return _super.countDocuments.call(this, { collectionName: collection.name });
        });
    }
}
exports.TokenManager = TokenManager;
//# sourceMappingURL=TokenManager.js.map