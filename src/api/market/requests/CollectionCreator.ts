import { Request, Response } from "express";
import { CheckablePostRequest, RequestContext } from "itrm-tools";
import { CollectionManager } from "../mongoose/CollectionManager";

export class CollectionCreator extends CheckablePostRequest {
    private collectionManager: CollectionManager;

    constructor(collectionManager: CollectionManager) {
        super({
            path: '/collections',
            params: [{
                context: RequestContext.BODY,
                properties: [ "name" ]
            }]
        });
        this.collectionManager = collectionManager;
    }

    public async apply(req: Request, res: Response): Promise<any> {
        const { name }  = req.body;
        let collection = await this.collectionManager.find(name);
        if (collection)
            return res.status(400).json({ message: "Collection '" + name + "' already exists" });
        await this.collectionManager.createByName(name);
        return res.status(200).json({ message: "Collection '" + name + "' was created" });
    }
}