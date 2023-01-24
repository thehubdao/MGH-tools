import { Request, Response } from "express";
import { CheckableDeleteRequest, RequestContext } from "itrm-tools";
import { CollectionManager } from "../mongoose/CollectionManager";
import { TokenManager } from "../mongoose/TokenManager";

export class CollectionEraser extends CheckableDeleteRequest {
    private collectionManager: CollectionManager;
    private tokenManager: TokenManager;
    
    constructor(collectionManager: CollectionManager, tokenManager: TokenManager) {
        super({
            path: '/collections/:name',
            params: [{
                context: RequestContext.PARAMS,
                properties: [ "name" ]
            }]
        });
        this.collectionManager = collectionManager;
        this.tokenManager = tokenManager;
    }

    public async apply(req: Request, res: Response): Promise<any> {
        const { name } = req.params;
        let collection = await this.collectionManager.findByName(name);
        if (collection) {
            await this.collectionManager.deleteByName(collection.name);
            await this.tokenManager.deleteByCollection(collection);
            return res.status(200).json({ message: "Collection deleted" });
        }
        return res.status(400).json({ message: "Collection '" + name + "' was not found" });
    }
}