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
exports.TokenizedModelManager = void 0;
const itrm_tools_1 = require("itrm-tools");
class TokenizedModelManager extends itrm_tools_1.MongooseModelManager {
    constructor(collection, definition) {
        super(collection, definition);
    }
    findByTokenId(tokenId) {
        return super.find({ tokenId: tokenId });
    }
    findMany(tokenIds) {
        return super.findMany({ tokenId: { $in: tokenIds } });
    }
    update(token) {
        return super.updateOne({ tokenId: token.tokenId }, token);
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
    deleteByTokenId(tokenId) {
        return super.delete({ tokenId: tokenId });
    }
    deleteManyTokens(tokens) {
        let writes = [];
        for (let token of tokens) {
            writes.push({
                deleteOne: {
                    filter: { tokenId: token.tokenId },
                }
            });
        }
        return super.bulkWrite(writes);
    }
}
exports.TokenizedModelManager = TokenizedModelManager;
//# sourceMappingURL=TokenizedModelManager.js.map