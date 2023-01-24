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
exports.TokenCreator = void 0;
const itrm_tools_1 = require("itrm-tools");
class TokenCreator extends itrm_tools_1.CheckablePostRequest {
    constructor(collectionManager, tokenManager) {
        super({
            path: '/collections/:name/tokens',
            params: [{
                    context: itrm_tools_1.RequestContext.PARAMS,
                    properties: ["name"]
                }, {
                    context: itrm_tools_1.RequestContext.BODY,
                    properties: ["tokenIds"]
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
                const { tokenIds } = req.body;
                let existance = {};
                for (let token of yield this.tokenManager.findManyByCollection(collection, tokenIds))
                    existance[token.tokenId] = true;
                let tokens = [];
                for (let tokenId of tokenIds)
                    if (!existance[tokenId])
                        tokens.push({
                            tokenId: tokenId,
                            chain: "ethereum",
                            collectionName: collection.name,
                            listings: [],
                            offers: []
                        });
                yield this.tokenManager.createMany(tokens);
                return res.status(200).json({ message: tokens.length + " new tokens where created for collection'" + name + "'" });
            }
            return res.status(400).json({ message: "Collection '" + name + "' was not found" });
        });
    }
}
exports.TokenCreator = TokenCreator;
//# sourceMappingURL=TokenCreator.js.map