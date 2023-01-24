import { Request, Response } from "express";
import { CheckablePostRequest, RequestContext } from "itrm-tools";
import { CollectionManager } from "../mongoose/CollectionManager";
import { IToken, TokenManager } from "../mongoose/TokenManager";

export class TokenCreator extends CheckablePostRequest {
    private collectionManager: CollectionManager;
    private tokenManager: TokenManager;
    
    constructor(collectionManager: CollectionManager, tokenManager: TokenManager) {
        super({
            path: '/collections/:name/tokens',
            params: [{
                context: RequestContext.PARAMS,
                properties: [ "name" ]
            }, {
                context: RequestContext.BODY,
                properties: [ "tokenIds" ]
            }]
        });
        this.collectionManager = collectionManager;
        this.tokenManager = tokenManager;
    }

    public async apply(req: Request, res: Response): Promise<any> {
        const { name } = req.params;
        let collection = await this.collectionManager.findByName(name);
        if (collection) {
            const { tokenIds } = req.body;
            let existance: any = {};
            for (let token of await this.tokenManager.findManyByCollection(collection, tokenIds))
                existance[token.tokenId] = true;
            let tokens: IToken[] = [];
            for (let tokenId of tokenIds)
                if (!existance[tokenId])
                    tokens.push({
                        tokenId: tokenId,
                        chain: "ethereum",
                        collectionName: collection.name,
                        listings: [],
                        offers: []
                    });
            await this.tokenManager.createMany(tokens);
            return res.status(200).json({ message: tokens.length + " new tokens where created for collection'" + name + "'" });
        }
        return res.status(400).json({ message: "Collection '" + name + "' was not found" });
    }
}