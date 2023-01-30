export interface IHistoricalTransaction {
    timestamp: number,
    time: string,
    hash: string,
    action: string,
    owner: string,
    chain: string,
    price?: number,
    eth_price?: number,
    symbol?: string,
    valuation?: number,
    market: string
}