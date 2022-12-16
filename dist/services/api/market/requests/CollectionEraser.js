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
exports.CollectionEraser = void 0;
const APIRequest_1 = require("../../APIRequest");
class CollectionEraser extends APIRequest_1.APIRequest {
    constructor() {
        super(APIRequest_1.RequestType.DELETE, '/collections/:name');
    }
    apply(memory, req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { name } = req.params;
            let collection = yield memory.market.collectionManager.find(name);
            if (collection) {
                yield memory.market.collectionManager.delete(collection.name);
                yield memory.market.tokenManager.delete(collection.name);
                return res.status(200).json({ message: "Collection deleted" });
            }
            return res.status(400).json({ message: "Collection '" + name + "' was not found" });
        });
    }
}
exports.CollectionEraser = CollectionEraser;
//# sourceMappingURL=CollectionEraser.js.map