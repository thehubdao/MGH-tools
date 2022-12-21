import { APIRequest, RequestType } from "../../APIRequest";
import { IToken } from "../mongoose/TokenManager";
import { TOkenCleaner } from "../utils/TokenCleaner";

export class ListingsRequest  extends APIRequest {
    constructor() {
        super(RequestType.GET, '/collections/:name/listings');
    }

    public async apply(memory: any, req: any, res: any): Promise<any> {
        const { name } = req.params;
        let collection = await memory.market.collectionManager.find(name);
        if (collection) {
            let { from, size } = req.query;
            from = parseInt(from);
            size = parseInt(size);
            if (!isNaN(from) && !isNaN(size)) {
                let listings = await memory.market.tokenManager.batchListings(collection, from, Math.min(Math.abs(size), 500));
                return res.status(200).json({ result: await this.clean(listings) });
            }
            return res.status(400).send({ err: "parameters 'from' or 'size' are not valid, check your query" });
        }
        return res.status(400).json({ message: "Collection '" + name + "' was not found" });
    }

    private clean(tokens: IToken[]) {
        let result: any[] = [];
        for (let token of tokens)
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