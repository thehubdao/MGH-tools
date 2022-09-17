import axios from 'axios';

export enum Coin {
    ATRI, BTC, CUBE, DAI, ETH, MANA, RARI, SAND, SCOTT, USDC, WBTC, WETH
}

export class PriceFinder {
    private prices: any = {};
    private pair: string;

    constructor(pair?: string) {
        this.pair = pair ?? "eth";
    }

    public async getPrice(symbol: Coin, date?: Date) {
        date = date ?? new Date();
        let id = this.parseSymbolId(symbol);
        let key = (10000 * date.getFullYear()) + (100 * (date.getMonth() + 1)) + date.getDate();
        if (symbol == Coin.CUBE)
            key = Math.max(key, 20200221);
        return await this.findPrice(id, "" + key);
    }

    private async findPrice(symbol: string, date: string) {
        let key = symbol + "_" + date;
        if (this.prices[key])
            return new Promise((resolve, reject) => {
                let url = "https://api.coingecko.com/api/v3/coins/" + symbol + "/history?date="
		            + date.substring(6) + "-" + date.substring(4, 6) + "-" + date.substring(0, 4);
                console.log("> url:", url);
                axios.get(url, { headers: {
                    'Content-Type': 'application/json'
                }}).then(response => {
                    if (response.data.market_data && response.data.market_data.current_price)
                        this.prices[key] = response.data.market_data.current_price[this.pair];
                    resolve(this.prices[key]);
                }).catch(err => { resolve(this.prices[key]); });
            });
        return this.prices[key];
    }

    parseSymbolId(symbol: Coin) {
        switch (symbol) {
            case Coin.ATRI: return "atari";
            case Coin.BTC: return "bitcoin";
            case Coin.CUBE: return "somnium-space-cubes";
            case Coin.DAI: return "dai";
            case Coin.MANA: return "decentraland";
            case Coin.RARI: return "rarible";
            case Coin.SAND: return "the-sandbox";
            case Coin.SCOTT: return "scotty-beam";
            case Coin.USDC: return "usd-coin";
            case Coin.WBTC: return "bitcoin";
            default: return "ethereum";
        }
    }
}