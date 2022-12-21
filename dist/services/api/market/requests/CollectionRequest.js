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
exports.CollectionRequest = void 0;
const APIRequest_1 = require("../../APIRequest");
class CollectionRequest extends APIRequest_1.APIRequest {
    constructor() {
        super(APIRequest_1.RequestType.GET, '/collections');
    }
    apply(memory, req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let { from, size } = req.query;
            if (from && size) {
                from = parseInt(from);
                size = parseInt(size);
                if (!isNaN(from) && !isNaN(size))
                    return res.status(200).json({ collections: yield this.getCollectionInfo(memory, yield memory.market.collectionManager.batch(from, size)) });
                return res.status(400).send({ err: "parameters 'from' or 'size' are not valid, check your query" });
            }
            return res.status(400).send({ err: "no valid parameter" });
        });
    }
    getCollectionInfo(memory, collections) {
        return __awaiter(this, void 0, void 0, function* () {
            let result = [];
            for (let collection of collections)
                result.push({
                    name: collection.name,
                    tokens: yield memory.market.tokenManager.countTokens(collection)
                });
            return result;
        });
    }
}
exports.CollectionRequest = CollectionRequest;
//# sourceMappingURL=CollectionRequest.js.map