import { Request, Response } from "express";
import { CheckableGetRequest, RequestContext } from "itrm-tools";
import { CollectionManager } from "../mongoose/CollectionManager";
import { IToken, TokenManager } from "../mongoose/TokenManager";
import { TOkenCleaner } from "../utils/TokenCleaner";

export class ListingsRequest  extends CheckableGetRequest {
    private collectionManager: CollectionManager;
    private tokenManager: TokenManager;
    
    constructor(collectionManager: CollectionManager, tokenManager: TokenManager) {
        super({
            path: '/collections/:name/listings',
            params: [{
                context: RequestContext.PARAMS,
                properties: [ "name" ]
            }, {
                context: RequestContext.QUERY,
                properties: [ "from", "size" ]
            }]
        });
        this.collectionManager = collectionManager;
        this.tokenManager = tokenManager;
    }

    public async apply(req: Request, res: Response): Promise<any> {
        const { name } = req.params;
        let collection = await this.collectionManager.findByName(name);
        if (collection) {
            let { from, size } = req.query;
            let start = parseInt("" + from);
            let total = parseInt("" + size);
            if (!isNaN(start) && !isNaN(total)) {
                let listings = await this.tokenManager.batchListings(collection, start, Math.min(Math.abs(total), 500));
                return res.status(200).json({ result: await this.clean(listings) });
            }
            return res.status(400).send({ err: "parameters 'from' or 'size' are not valid, check your query" });
        }
        return res.status(400).json({ message: "Collection '" + name + "' was not found" });
    }

    private clean(tokens: IToken[]) {
        let result: any[] = [];
        for (let token of tokens)
            if (token.listings.length > 0)
                result.push({
                    tokenId: token.tokenId,
                    chain: token.chain,
                    currentPrice: {
                        price: token.currentPrice?.price,
                        eth_price: token.currentPrice?.eth_price,
                        symbol: token.currentPrice?.symbol
                    }, listings: TOkenCleaner.cleanOrders(token.listings)
                });
        return result;
    }
}