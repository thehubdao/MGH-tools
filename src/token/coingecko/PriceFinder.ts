import axios from 'axios';
import { Coin } from './Coin';

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
        return await this.findPrice(id, "" + this.adjustDate(symbol, key));
    }

    private adjustDate(symbol: Coin, date: number) {
        switch (symbol) {
            case Coin.APE:   return Math.max(date, 20220317);
            case Coin.ARTX:  return Math.max(date, 20210404);
            case Coin.ATRI:  return Math.max(date, 20201102);
            case Coin.BTC:   return Math.max(date, 20130428);
            case Coin.CUBE:  return Math.max(date, 20200221);
            case Coin.DAI:   return Math.max(date, 20191119);
            case Coin.MANA:  return Math.max(date, 20171028);
            case Coin.MATIC:  return Math.max(date, 20190427);
            case Coin.RARI:  return Math.max(date, 20200717);
            case Coin.SAND:  return Math.max(date, 20200814);
            case Coin.SCOTT: return Math.max(date, 20211220);
            case Coin.USDC:  return Math.max(date, 20181005);
            case Coin.WBTC:  return Math.max(date, 20130428);
            default: return Math.max(date, 20150807);
        }
    }

    private async findPrice(symbol: string, date: string) {
        let key = symbol + "_" + date;
        if (!this.prices[key])
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
            case Coin.APE:   return "apecoin";
            case Coin.ARTX:  return "artx";
            case Coin.ATRI:  return "atari";
            case Coin.BTC:   return "bitcoin";
            case Coin.CUBE:  return "somnium-space-cubes";
            case Coin.DAI:   return "dai";
            case Coin.MANA:  return "decentraland";
            case Coin.MATIC:  return "matic-network";
            case Coin.RARI:  return "rarible";
            case Coin.SAND:  return "the-sandbox";
            case Coin.SCOTT: return "scotty-beam";
            case Coin.USDC:  return "usd-coin";
            case Coin.WBTC:  return "bitcoin";
            default: return "ethereum";
        }
    }
}