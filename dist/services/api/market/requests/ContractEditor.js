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
exports.ContractEditor = void 0;
const APIRequest_1 = require("../../APIRequest");
class ContractEditor extends APIRequest_1.APIRequest {
    constructor() {
        super(APIRequest_1.RequestType.PUT, '/collections/:name/contracts/:chain');
    }
    apply(memory, req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { name, chain } = req.params;
            const { address } = req.body;
            if (!address)
                return res.status(400).send({ err: "property 'address' was not found in body" });
            let collection = yield memory.market.collectionManager.find(name);
            if (collection) {
                for (let contract of collection.contracts)
                    if (contract.chain === chain)
                        contract.address = address;
                yield memory.market.collectionManager.update(collection);
                return res.status(200).json({ message: "Contract updated" });
            }
            return res.status(400).send({ err: "Collection '" + name + "' was not found" });
        });
    }
}
exports.ContractEditor = ContractEditor;
//# sourceMappingURL=ContractEditor.js.map