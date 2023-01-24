import { Request, Response } from "express";
import { CheckableGetRequest, RequestContext } from "itrm-tools";
import { CollectionManager } from "../mongoose/CollectionManager";
import { IToken, TokenManager } from "../mongoose/TokenManager";
import { TOkenCleaner } from "../utils/TokenCleaner";

export class TokenRequest extends CheckableGetRequest {
    private collectionManager: CollectionManager;
    private tokenManager: TokenManager;
    
    constructor(collectionManager: CollectionManager, tokenManager: TokenManager) {
        super({
            path: '/collections/:name/tokens',
            params: [{
                context: RequestContext.PARAMS,
                properties: [ "name" ]
            }, {
                context: RequestContext.QUERY,
                properties: [ "tokenId" ]
            }]
        });
        this.collectionManager = collectionManager;
        this.tokenManager = tokenManager;
    }

    public async apply(req: Request, res: Response): Promise<any> {
        const { name } = req.params;
        let collection = await this.collectionManager.findByName(name);
        if (collection) {
            const { tokenId } = req.query;
            let tokenIds: string[] = [];
            if (Array.isArray(tokenId)) {
                for (let value of tokenId)
                    tokenIds.push("" + value);
            } else
                tokenIds = ("" + tokenId).split(',');
            return res.status(200).json({ results: this.clean(await this.tokenManager.findManyByCollection(collection, tokenIds)) });
        }
        return res.status(400).json({ message: "Collection '" + name + "' was not found" });
    }

    private clean(tokens: IToken[]) {
        let result: any[] = [];
        for (let token of tokens)
            result.push(this.cleanToken(token));
        return result;
    }

    private cleanToken(token: IToken) {
        return {
            tokenId: token.tokenId,
            chain: token.chain,
            listings: TOkenCleaner.cleanOrders(token.listings),
            offers: TOkenCleaner.cleanOrders(token.offers),
            lastSale: token.lastSale ? TOkenCleaner.cleanSale(token.lastSale) : undefined,
            currentPrice: (token.currentPrice && token.listings.length > 0) ? TOkenCleaner.cleanPrice(token.currentPrice) : undefined,
            bestOfferedPrice: (token.bestOfferedPrice && token.offers.length > 0) ? TOkenCleaner.cleanPrice(token.bestOfferedPrice) : undefined
        };
    }
}