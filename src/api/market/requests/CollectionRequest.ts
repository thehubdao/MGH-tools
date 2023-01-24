import { Request, Response } from "express";
import { CheckableGetRequest, RequestContext } from "itrm-tools";
import { CollectionManager, ICollection } from "../mongoose/CollectionManager";
import { TokenManager } from "../mongoose/TokenManager";

export class CollectionRequest extends CheckableGetRequest {
    private collectionManager: CollectionManager;
    private tokenManager: TokenManager;

    constructor(collectionManager: CollectionManager, tokenManager: TokenManager) {
        super({
            path: '/collections',
            params: [{
                context: RequestContext.QUERY,
                properties: [ "from", "size" ]
            }]
        });
        this.collectionManager = collectionManager;
        this.tokenManager = tokenManager;
    }

    public async apply(req: Request, res: Response): Promise<any> {
        let { from, size } = req.query;
        if (from && size) {
            let start = parseInt(from.toString());
            let total = parseInt(size.toString());
            if (!isNaN(start) && !isNaN(total))
                return res.status(200).json({ collections: await this.getCollectionInfo(await this.collectionManager.batch({}, start, total)) });
            return res.status(400).send({ err: "parameters 'from' or 'size' are not valid, check your query" });
        }
        return res.status(400).send({ err: "no valid parameter" });
    }

    private async getCollectionInfo(collections: ICollection[]) {
        let result: any = [];
        for (let collection of collections)
            result.push({
                name: collection.name,
                tokens: await this.tokenManager.countTokens(collection)
            });
        return result;
    }
}