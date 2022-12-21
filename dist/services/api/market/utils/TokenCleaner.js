"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TOkenCleaner = void 0;
class TOkenCleaner {
    static cleanOrders(orders) {
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
    static cleanSale(sale) {
        return {
            timestamp: sale.timestamp,
            price: sale.price,
            eth_price: sale.eth_price,
            eth_usd_price: sale.eth_usd_price,
            symbol: sale.symbol
        };
    }
    static cleanPrice(price) {
        return {
            price: price.price,
            eth_price: price.eth_price,
            symbol: price.symbol
        };
    }
}
exports.TOkenCleaner = TOkenCleaner;
//# sourceMappingURL=TokenCleaner.js.map