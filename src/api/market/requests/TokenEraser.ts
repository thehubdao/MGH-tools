import { Request, Response } from "express";
import { CheckableDeleteRequest, RequestContext } from "itrm-tools";
import { CollectionManager } from "../mongoose/CollectionManager";
import { TokenManager } from "../mongoose/TokenManager";

export class TokenEraser extends CheckableDeleteRequest {
    private collectionManager: CollectionManager;
    private tokenManager: TokenManager;

    constructor(collectionManager: CollectionManager, tokenManager: TokenManager) {
        super({
            path: '/collections/:name/tokens/:tokenId',
            params: [{
                context: RequestContext.PARAMS,
                properties: [ "name", "tokenId" ]
            }]
        });
        this.collectionManager = collectionManager;
        this.tokenManager = tokenManager;
    }

    public async apply(req: Request, res: Response): Promise<any> {
        const { name, tokenId } = req.params;
        let collection = await this.collectionManager.findByName(name);
        if (collection) {
            if (!tokenId)
                return res.status(400).send({ err: "parameter 'tokenId' was not found" });
            await this.tokenManager.deleteManyByTokenId(collection, tokenId);
            return res.status(200).json({ message: "Token '" + tokenId + "' was removed from collection'" + name + "'" });
        }
        return res.status(400).json({ message: "Collection '" + name + "' was not found" });
    }
}