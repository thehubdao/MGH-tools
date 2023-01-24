import { Request, Response } from "express";
import { CheckableGetRequest, RequestContext } from "itrm-tools";
import { CollectionManager, IContract } from "../mongoose/CollectionManager";

export class ContractRequest extends CheckableGetRequest {
    private collectionManager: CollectionManager;
    
    constructor(collectionManager: CollectionManager) {
        super({
            path: '/collections/:name/contracts',
            params: [{
                context: RequestContext.PARAMS,
                properties: [ "name" ]
            }]
        });
        this.collectionManager = collectionManager;
    }

    public async apply(req: Request, res: Response): Promise<any> {
        const { name } = req.params;
        let collection = await this.collectionManager.findByName(name);
        if (collection)
            return res.status(200).json({ contracts: this.clean(collection.contracts) });
        return res.status(400).send({ err: "Collection '" + name + "' was not found" });
    }

    private clean(contracts: IContract[]): any {
        let result: IContract[] = [];
        for (let contract of contracts)
            result.push({ chain: contract.chain, address: contract.address });
        return result;
    }
}