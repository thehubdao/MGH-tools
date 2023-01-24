import { IOrder, IPrice, ISale } from "../mongoose/TokenManager";

export class TOkenCleaner {
    public static cleanOrders(orders: IOrder[]) {
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
    
    public static cleanSale(sale: ISale) {
        return {
            timestamp: sale.timestamp,
            price: sale.price,
            eth_price: sale.eth_price,
            eth_usd_price: sale.eth_usd_price,
            symbol: sale.symbol
        };
    }

    public static cleanPrice(price: IPrice) {
        return {
            price: price.price,
            eth_price: price.eth_price,
            symbol: price.symbol
        };
    }
}