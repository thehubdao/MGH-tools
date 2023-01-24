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
exports.ContractRequest = void 0;
const itrm_tools_1 = require("itrm-tools");
class ContractRequest extends itrm_tools_1.CheckableGetRequest {
    constructor(collectionManager) {
        super({
            path: '/collections/:name/contracts',
            params: [{
                    context: itrm_tools_1.RequestContext.PARAMS,
                    properties: ["name"]
                }]
        });
        this.collectionManager = collectionManager;
    }
    apply(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { name } = req.params;
            let collection = yield this.collectionManager.findByName(name);
            if (collection)
                return res.status(200).json({ contracts: this.clean(collection.contracts) });
            return res.status(400).send({ err: "Collection '" + name + "' was not found" });
        });
    }
    clean(contracts) {
        let result = [];
        for (let contract of contracts)
            result.push({ chain: contract.chain, address: contract.address });
        return result;
    }
}
exports.ContractRequest = ContractRequest;
//# sourceMappingURL=ContractRequest.js.map