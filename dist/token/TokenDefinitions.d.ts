export interface HistoricalTransaction {
    timestamp: number;
    time: string;
    hash: string;
    action: string;
    price: number;
    eth_price: number;
    buyer: string;
    symbol: string;
    market: string;
}
