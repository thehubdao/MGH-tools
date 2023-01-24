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
exports.ContractCreator = void 0;
const itrm_tools_1 = require("itrm-tools");
class ContractCreator extends itrm_tools_1.CheckablePostRequest {
    constructor(collectionManager) {
        super({
            path: '/collections/:name/contracts',
            params: [{
                    context: itrm_tools_1.RequestContext.PARAMS,
                    properties: ["name"]
                }, {
                    context: itrm_tools_1.RequestContext.BODY,
                    properties: ["chain", "address"]
                }]
        });
        this.collectionManager = collectionManager;
    }
    apply(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { name } = req.params;
            let collection = yield this.collectionManager.findByName(name);
            if (collection) {
                const { chain, address } = req.body;
                return res.status(200).json(yield this.addContract(collection, { chain: chain, address: address }));
            }
            return res.status(400).send({ err: "Collection '" + name + "' was not found" });
        });
    }
    addContract(collection, contract) {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.checkExistance(collection.contracts, contract))
                return { message: "Contract for '" + contract.chain + "' chain already exists, if you want to modify the contract use the PUT request" };
            collection.contracts.push(contract);
            yield this.collectionManager.update(collection);
            return { message: "Contract was linked" };
        });
    }
    checkExistance(contracts, candidate) {
        for (let contract of contracts)
            if (contract.chain === candidate.chain)
                return true;
        return false;
    }
}
exports.ContractCreator = ContractCreator;
//# sourceMappingURL=ContractCreator.js.map