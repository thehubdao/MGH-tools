import { Coin } from './Coin';
export declare class PriceFinder {
    private prices;
    private pair;
    constructor(pair?: string);
    getPrice(symbol: Coin, date?: Date): Promise<any>;
    private adjustDate;
    private findPrice;
    parseSymbolId(symbol: Coin): "apecoin" | "artx" | "atari" | "bitcoin" | "somnium-space-cubes" | "dai" | "decentraland" | "rarible" | "the-sandbox" | "scotty-beam" | "usd-coin" | "ethereum";
}
