import { Coin } from './Coin';
export declare class PriceFinder {
    private prices;
    private pair;
    constructor(pair?: string);
    getPrice(symbol: Coin, date?: Date): Promise<any>;
    private adjustDate;
    private findPrice;
    parseSymbolId(symbol: Coin): "ethereum" | "apecoin" | "artx" | "atari" | "bitcoin" | "somnium-space-cubes" | "dai" | "decentraland" | "matic-network" | "rarible" | "the-sandbox" | "scotty-beam" | "usd-coin";
}
