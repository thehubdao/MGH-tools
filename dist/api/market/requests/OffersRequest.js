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
exports.OffersRequest = void 0;
const itrm_tools_1 = require("itrm-tools");
const TokenCleaner_1 = require("../utils/TokenCleaner");
class OffersRequest extends itrm_tools_1.CheckableGetRequest {
    constructor(collectionManager, tokenManager) {
        super({
            path: '/collections/:name/offers',
            params: [{
                    context: itrm_tools_1.RequestContext.PARAMS,
                    properties: ["name"]
                }, {
                    context: itrm_tools_1.RequestContext.QUERY,
                    properties: ["from", "size"]
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
                let { from, size } = req.query;
                let start = parseInt("" + from);
                let total = parseInt("" + size);
                if (!isNaN(start) && !isNaN(total)) {
                    let offers = yield this.tokenManager.batchOffers(collection, start, Math.min(Math.abs(total), 500));
                    return res.status(200).json({ result: yield this.clean(offers) });
                }
                return res.status(400).send({ err: "parameters 'from' or 'size' are not valid, check your query" });
            }
            return res.status(400).json({ message: "Collection '" + name + "' was not found" });
        });
    }
    clean(tokens) {
        var _a, _b, _c;
        let result = [];
        for (let token of tokens)
            if (token.offers.length > 0)
                result.push({
                    tokenId: token.tokenId,
                    chain: token.chain,
                    bestOfferedPrice: {
                        price: (_a = token.bestOfferedPrice) === null || _a === void 0 ? void 0 : _a.price,
                        eth_price: (_b = token.bestOfferedPrice) === null || _b === void 0 ? void 0 : _b.eth_price,
                        symbol: (_c = token.bestOfferedPrice) === null || _c === void 0 ? void 0 : _c.symbol
                    }, offers: TokenCleaner_1.TOkenCleaner.cleanOrders(token.offers)
                });
        return result;
    }
}
exports.OffersRequest = OffersRequest;
//# sourceMappingURL=OffersRequest.js.map