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
const ModelManager_1 = require("../mongoose/ModelManager");
class TokenizedModelManager extends ModelManager_1.ModelManager {
    constructor(collection, definition) {
        super(collection, definition);
    }
    find(tokenId) {
        const _super = Object.create(null, {
            find: { get: () => super.find }
        });
        return __awaiter(this, void 0, void 0, function* () {
            return yield _super.find.call(this, { tokenId: tokenId });
        });
    }
    findMany(tokenIds) {
        const _super = Object.create(null, {
            findMany: { get: () => super.findMany }
        });
        return __awaiter(this, void 0, void 0, function* () {
            return yield _super.findMany.call(this, { tokenId: { $in: tokenIds } });
        });
    }
    update(token) {
        const _super = Object.create(null, {
            update: { get: () => super.update }
        });
        return __awaiter(this, void 0, void 0, function* () {
            return yield _super.update.call(this, { tokenId: token.tokenId }, token);
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
    delete(tokenId) {
        const _super = Object.create(null, {
            delete: { get: () => super.delete }
        });
        return __awaiter(this, void 0, void 0, function* () {
            return yield _super.delete.call(this, { tokenId: tokenId });
        });
    }
    deleteMany(tokens) {
        const _super = Object.create(null, {
            bulkWrite: { get: () => super.bulkWrite }
        });
        return __awaiter(this, void 0, void 0, function* () {
            let writes = [];
            for (let token of tokens) {
                writes.push({
                    deleteOne: {
                        filter: { tokenId: token.tokenId },
                    }
                });
            }
            return yield _super.bulkWrite.call(this, writes);
        });
    }
}
exports.TokenizedModelManager = TokenizedModelManager;
//# sourceMappingURL=TokenizedModelManager.js.map