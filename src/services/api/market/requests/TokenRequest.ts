import { IOrder, IPrice, ISale, IToken } from "../mongoose/TokenManager";
import { APIRequest, RequestType } from "../../APIRequest";

export class TokenRequest extends APIRequest {
    constructor() {
        super(RequestType.GET, '/collections/:name/tokens');
    }

    public async apply(memory: any, req: any, res: any): Promise<any> {
        const { name } = req.params;
        let collection = await memory.market.collectionManager.find(name);
        if (collection) {
            const { tokenIds } = req.body;
            if (!tokenIds)
                return res.status(400).send({ err: "property 'tokenIds' was not found in body" });
            return res.status(200).json({ results: this.clean(await memory.market.tokenManager.findManyByCollection(collection, tokenIds)) });
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
            listings: this.cleanOrders(token.listings),
            offers: this.cleanOrders(token.offers),
            lastSale: token.lastSale ? this.cleanSale(token.lastSale) : undefined,
            currentPrice: token.currentPrice ? this.cleanPrice(token.currentPrice) : undefined,
            bestOfferedPrice: token.bestOfferedPrice ? this.cleanPrice(token.bestOfferedPrice) : undefined
        };
    }

    private cleanOrders(orders: IOrder[]) {
        let result: any[] = [];
        for (let order of orders)
            result.push({
                price: order.price,
                eth_price: order.eth_price,
                order_hash: order.order_hash,
                listing_time: order.listing_time,
                expiration_time: order.expiration_time,
                created_date: order.created_date,
                closing_date: order.closing_date,
                maker: {
                    user: order.maker.user,
                    profile_img_url: order.maker.profile_img_url,
                    address: order.maker.address
                },
                symbol: order.symbol
            });
        return result;
    }
    
    private cleanSale(sale: ISale) {
        return {
            timestamp: sale.timestamp,
            price: sale.price,
            eth_price: sale.eth_price,
            eth_usd_price: sale.eth_usd_price,
            symbol: sale.symbol
        };
    }

    private cleanPrice(price: IPrice) {
        return {
            price: price.price,
            eth_price: price.eth_price,
            symbol: price.symbol
        };
    }
}