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
exports.TokenRequest = void 0;
const itrm_tools_1 = require("itrm-tools");
const TokenCleaner_1 = require("../utils/TokenCleaner");
class TokenRequest extends itrm_tools_1.CheckableGetRequest {
    constructor(collectionManager, tokenManager) {
        super({
            path: '/collections/:name/tokens',
            params: [{
                    context: itrm_tools_1.RequestContext.PARAMS,
                    properties: ["name"]
                }, {
                    context: itrm_tools_1.RequestContext.QUERY,
                    properties: ["tokenId"]
                }]
        });
        this.collectionManager = collectionManager;
        this.tokenManager = tokenManager;
    }
    apply(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { name } = req.params;
            let collection = yield this.collectionManager.findByName(name);
            if (collection) {
                const { tokenId } = req.query;
                let tokenIds = [];
                if (Array.isArray(tokenId)) {
                    for (let value of tokenId)
                        tokenIds.push("" + value);
                }
                else
                    tokenIds = ("" + tokenId).split(',');
                return res.status(200).json({ results: this.clean(yield this.tokenManager.findManyByCollection(collection, tokenIds)) });
            }
            return res.status(400).json({ message: "Collection '" + name + "' was not found" });
        });
    }
    clean(tokens) {
        let result = [];
        for (let token of tokens)
            result.push(this.cleanToken(token));
        return result;
    }
    cleanToken(token) {
        return {
            tokenId: token.tokenId,
            chain: token.chain,
            listings: TokenCleaner_1.TOkenCleaner.cleanOrders(token.listings),
            offers: TokenCleaner_1.TOkenCleaner.cleanOrders(token.offers),
            lastSale: token.lastSale ? TokenCleaner_1.TOkenCleaner.cleanSale(token.lastSale) : undefined,
            currentPrice: (token.currentPrice && token.listings.length > 0) ? TokenCleaner_1.TOkenCleaner.cleanPrice(token.currentPrice) : undefined,
            bestOfferedPrice: (token.bestOfferedPrice && token.offers.length > 0) ? TokenCleaner_1.TOkenCleaner.cleanPrice(token.bestOfferedPrice) : undefined
        };
    }
}
exports.TokenRequest = TokenRequest;
//# sourceMappingURL=TokenRequest.js.map