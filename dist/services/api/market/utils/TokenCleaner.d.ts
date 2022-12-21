import { IOrder, IPrice, ISale } from "../mongoose/TokenManager";
export declare class TOkenCleaner {
    static cleanOrders(orders: IOrder[]): any[];
    static cleanSale(sale: ISale): {
        timestamp: number;
        price: number;
        eth_price: number;
        eth_usd_price: number;
        symbol: string;
    };
    static cleanPrice(price: IPrice): {
        price: number;
        eth_price: number;
        symbol: string;
    };
}
