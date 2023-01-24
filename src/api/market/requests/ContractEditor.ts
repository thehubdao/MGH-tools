import { Request, Response } from "express";
import { CheckablePutRequest, RequestContext } from "itrm-tools";
import { CollectionManager } from "../mongoose/CollectionManager";

export class ContractEditor extends CheckablePutRequest {
    private collectionManager: CollectionManager;

    constructor(collectionManager: CollectionManager) {
        super({
            path: '/collections/:name/contracts/:chain',
            params: [{
                context: RequestContext.PARAMS,
                properties: [ "name, chain" ]
            }, {
                context: RequestContext.BODY,
                properties: [ "address" ]
            }]
        });
        this.collectionManager = collectionManager;
    }

    public async apply(req: Request, res: Response): Promise<any> {
        const { name, chain } = req.params;
        const { address } = req.body;
        let collection = await this.collectionManager.findByName(name);
        if (collection) {
            for (let contract of collection.contracts)
                if (contract.chain === chain)
                    contract.address = address;
            await this.collectionManager.update(collection);
            return res.status(200).json({ message: "Contract updated" });
        }
        return res.status(400).send({ err: "Collection '" + name + "' was not found" });
    }
}