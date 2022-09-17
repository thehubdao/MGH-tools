import { Coin } from './Coin';
export declare class PriceFinder {
    private prices;
    private pair;
    constructor(pair?: string);
    getPrice(symbol: Coin, date?: Date): Promise<any>;
    private findPrice;
    parseSymbolId(symbol: Coin): "atari" | "bitcoin" | "somnium-space-cubes" | "dai" | "decentraland" | "rarible" | "the-sandbox" | "scotty-beam" | "usd-coin" | "ethereum";
}
