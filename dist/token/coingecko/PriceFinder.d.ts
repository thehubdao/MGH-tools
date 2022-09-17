export declare enum Coin {
    ATRI = 0,
    BTC = 1,
    CUBE = 2,
    DAI = 3,
    ETH = 4,
    MANA = 5,
    RARI = 6,
    SAND = 7,
    SCOTT = 8,
    USDC = 9,
    WBTC = 10,
    WETH = 11
}
export declare class PriceFinder {
    private prices;
    private pair;
    constructor(pair?: string);
    getPrice(symbol: Coin, date?: Date): Promise<any>;
    private findPrice;
    parseSymbolId(symbol: Coin): "atari" | "bitcoin" | "somnium-space-cubes" | "dai" | "decentraland" | "rarible" | "the-sandbox" | "scotty-beam" | "usd-coin" | "ethereum";
}
