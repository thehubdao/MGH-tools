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
exports.ContractEraser = void 0;
const itrm_tools_1 = require("itrm-tools");
class ContractEraser extends itrm_tools_1.CheckableDeleteRequest {
    constructor(collectionManager) {
        super({
            path: '/collections/:name/contracts/:chain',
            params: [{
                    context: itrm_tools_1.RequestContext.PARAMS,
                    properties: ["name", "chain"]
                }]
        });
        this.collectionManager = collectionManager;
    }
    apply(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { name, chain } = req.params;
            let collection = yield this.collectionManager.findByName(name);
            if (collection) {
                for (let i = 0; i < collection.contracts.length; i++)
                    if (collection.contracts[i].chain === chain)
                        collection.contracts.splice(i, 1);
                yield this.collectionManager.update(collection);
                return res.status(200).json({ message: "Contract deleted" });
            }
            return res.status(400).send({ err: "Collection '" + name + "' was not found" });
        });
    }
}
exports.ContractEraser = ContractEraser;
//# sourceMappingURL=ContractEraser.js.map