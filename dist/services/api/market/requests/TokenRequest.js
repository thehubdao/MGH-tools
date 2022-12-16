"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TokenRequest = void 0;
const APIRequest_1 = require("../../APIRequest");
class TokenRequest extends APIRequest_1.APIRequest {
    constructor() {
        super(APIRequest_1.RequestType.GET, '/collections/:name/tokens');
    }
    apply(memory, req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { name } = req.params;
            let collection = yield memory.market.collectionManager.find(name);
            if (collection) {
                const { tokenIds } = req.body;
                if (!tokenIds)
                    return res.status(400).send({ err: "property 'tokenIds' was not found in body" });
                return res.status(200).json({ results: this.clean(yield memory.market.tokenManager.findManyByCollection(collection, tokenIds)) });
            }
            return res.status(400).json({ message: "Collection '" + name + "' was not found" });
        });
    }
    clean(tokens) {
        let result = [];
        for (let token of tokens)
            result.push(this.cleanToken(token));
        return result;
    }
    cleanToken(token) {
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
    cleanOrders(orders) {
        let result = [];
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
    cleanSale(sale) {
        return {
            timestamp: sale.timestamp,
            price: sale.price,
            eth_price: sale.eth_price,
            eth_usd_price: sale.eth_usd_price,
            symbol: sale.symbol
        };
    }
    cleanPrice(price) {
        return {
            price: price.price,
            eth_price: price.eth_price,
            symbol: price.symbol
        };
    }
}
exports.TokenRequest = TokenRequest;
//# sourceMappingURL=TokenRequest.js.map