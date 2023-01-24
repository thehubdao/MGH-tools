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
exports.TokenEraser = void 0;
const itrm_tools_1 = require("itrm-tools");
class TokenEraser extends itrm_tools_1.CheckableDeleteRequest {
    constructor(collectionManager, tokenManager) {
        super({
            path: '/collections/:name/tokens/:tokenId',
            params: [{
                    context: itrm_tools_1.RequestContext.PARAMS,
                    properties: ["name", "tokenId"]
                }]
        });
        this.collectionManager = collectionManager;
        this.tokenManager = tokenManager;
    }
    apply(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { name, tokenId } = req.params;
            let collection = yield this.collectionManager.findByName(name);
            if (collection) {
                if (!tokenId)
                    return res.status(400).send({ err: "parameter 'tokenId' was not found" });
                yield this.tokenManager.deleteManyByTokenId(collection, tokenId);
                return res.status(200).json({ message: "Token '" + tokenId + "' was removed from collection'" + name + "'" });
            }
            return res.status(400).json({ message: "Collection '" + name + "' was not found" });
        });
    }
}
exports.TokenEraser = TokenEraser;
//# sourceMappingURL=TokenEraser.js.map