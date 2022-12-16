import { ICollection, IContract } from "../mongoose/CollectionManager";
import { APIRequest, RequestType } from "../../APIRequest";

export class ContractCreator extends APIRequest {
    constructor() {
        super(RequestType.POST, '/collections/:name/contracts');
    }

    public async apply(memory: any, req: any, res: any): Promise<any> {
        const { name } = req.params;
        let collection = await memory.market.collectionManager.find(name);
        if (collection) {
            let { chain, address }  = req.body;
            if (!chain)
                return res.status(400).send({ err: "Property 'chain' was not found in request's body" });
            if (!address)
                return res.status(400).send({ err: "Property 'address' was not found in request's address" });
            return res.status(200).json(await this.addContract(memory, collection, { chain: chain, address: address }));
        }
        return res.status(400).send({ err: "Collection '" + name + "' was not found" });
    }

    private async addContract(memory: any, collection: ICollection, contract: IContract) {
        if (this.checkExistance(collection.contracts, contract))
            return { message: "Contract for '" + contract.chain + "' chain already exists, if you want to modify the contract use the PUT request" };
        collection.contracts.push(contract);
        await memory.market.collectionManager.update(collection);
        return { message: "Contract was linked" };
    }

    private checkExistance(contracts: IContract[], candidate: IContract) {
        for (let contract of contracts)
            if (contract.chain === candidate.chain)
                return true;
        return false;
    }
}