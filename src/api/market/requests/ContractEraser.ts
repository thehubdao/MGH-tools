import { Request, Response } from "express";
import { CheckableDeleteRequest, RequestContext } from "itrm-tools";
import { CollectionManager } from "../mongoose/CollectionManager";

export class ContractEraser extends CheckableDeleteRequest {
    private collectionManager: CollectionManager;
    
    constructor(collectionManager: CollectionManager) {
        super({
            path: '/collections/:name/contracts/:chain',
            params: [{
                context: RequestContext.PARAMS,
                properties: [ "name", "chain" ]
            }]
        });
        this.collectionManager = collectionManager;
    }

    public async apply(req: Request, res: Response): Promise<any> {
        const { name, chain } = req.params;
        let collection = await this.collectionManager.findByName(name);
        if (collection) {
            for (let i = 0; i < collection.contracts.length; i++)
                if (collection.contracts[i].chain === chain)
                    collection.contracts.splice(i, 1);
            await this.collectionManager.update(collection);
            return res.status(200).json({ message: "Contract deleted" });
        }
        return res.status(400).send({ err: "Collection '" + name + "' was not found" });
    }
}