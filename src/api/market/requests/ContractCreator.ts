import { Request, Response } from "express";
import { CheckablePostRequest, RequestContext } from "itrm-tools";
import { CollectionManager, ICollection, IContract } from "../mongoose/CollectionManager";

export class ContractCreator extends CheckablePostRequest {
    private collectionManager: CollectionManager;
    
    constructor(collectionManager: CollectionManager) {
        super({
            path: '/collections/:name/contracts',
            params: [{
                context: RequestContext.PARAMS,
                properties: [ "name" ]
            }, {
                context: RequestContext.BODY,
                properties: [ "chain", "address" ]
            }]
        });
        this.collectionManager = collectionManager;
    }

    public async apply(req: Request, res: Response): Promise<any> {
        const { name } = req.params;
        let collection = await this.collectionManager.findByName(name);
        if (collection) {
            const { chain, address }  = req.body;
            return res.status(200).json(await this.addContract(collection, { chain: chain, address: address }));
        }
        return res.status(400).send({ err: "Collection '" + name + "' was not found" });
    }

    private async addContract(collection: ICollection, contract: IContract) {
        if (this.checkExistance(collection.contracts, contract))
            return { message: "Contract for '" + contract.chain + "' chain already exists, if you want to modify the contract use the PUT request" };
        collection.contracts.push(contract);
        await this.collectionManager.update(collection);
        return { message: "Contract was linked" };
    }

    private checkExistance(contracts: IContract[], candidate: IContract) {
        for (let contract of contracts)
            if (contract.chain === candidate.chain)
                return true;
        return false;
    }
}