export interface HistoricalTransaction {
    timestamp: number;
    time: string;
    hash: string;
    action: string;
    valuation?: number;
    price: number;
    eth_price: number;
    buyer: string;
    symbol: string;
    broker: string;
}
