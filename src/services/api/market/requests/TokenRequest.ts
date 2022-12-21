import { IToken } from "../mongoose/TokenManager";
import { APIRequest, RequestType } from "../../APIRequest";
import { TOkenCleaner } from "../utils/TokenCleaner";

export class TokenRequest extends APIRequest {
    constructor() {
        super(RequestType.GET, '/collections/:name/tokens');
    }

    public async apply(memory: any, req: any, res: any): Promise<any> {
        const { name } = req.params;
        let collection = await memory.market.collectionManager.find(name);
        if (collection) {
            const { tokenId } = req.query;
            if (!tokenId)
                return res.status(400).send({ err: "property 'tokenIds' was not found in body" });
            return res.status(200).json({ results: this.clean(await memory.market.tokenManager.findManyByCollection(collection, Array.isArray(tokenId) ? tokenId : tokenId.toString().split(','))) });
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
            currentPrice: token.currentPrice ? TOkenCleaner.cleanPrice(token.currentPrice) : undefined,
            bestOfferedPrice: token.bestOfferedPrice ? TOkenCleaner.cleanPrice(token.bestOfferedPrice) : undefined
        };
    }
}