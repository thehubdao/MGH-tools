"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PriceFinder = void 0;
const axios_1 = __importDefault(require("axios"));
const Coin_1 = require("./Coin");
class PriceFinder {
    constructor(pair) {
        this.prices = {};
        this.pair = pair !== null && pair !== void 0 ? pair : "eth";
    }
    getPrice(symbol, date) {
        return __awaiter(this, void 0, void 0, function* () {
            date = date !== null && date !== void 0 ? date : new Date();
            let id = this.parseSymbolId(symbol);
            let key = (10000 * date.getFullYear()) + (100 * (date.getMonth() + 1)) + date.getDate();
            return yield this.findPrice(id, "" + this.adjustDate(symbol, key));
        });
    }
    adjustDate(symbol, date) {
        switch (symbol) {
            case Coin_1.Coin.APE: return Math.max(date, 20220317);
            case Coin_1.Coin.ARTX: return Math.max(date, 20210404);
            case Coin_1.Coin.ATRI: return Math.max(date, 20201102);
            case Coin_1.Coin.BTC: return Math.max(date, 20130428);
            case Coin_1.Coin.CUBE: return Math.max(date, 20200221);
            case Coin_1.Coin.DAI: return Math.max(date, 20191119);
            case Coin_1.Coin.MANA: return Math.max(date, 20171028);
            case Coin_1.Coin.RARI: return Math.max(date, 20200717);
            case Coin_1.Coin.SAND: return Math.max(date, 20200814);
            case Coin_1.Coin.SCOTT: return Math.max(date, 20211220);
            case Coin_1.Coin.USDC: return Math.max(date, 20181005);
            case Coin_1.Coin.WBTC: return Math.max(date, 20130428);
            default: return Math.max(date, 20150807);
        }
    }
    findPrice(symbol, date) {
        return __awaiter(this, void 0, void 0, function* () {
            let key = symbol + "_" + date;
            if (!this.prices[key])
                return new Promise((resolve, reject) => {
                    let url = "https://api.coingecko.com/api/v3/coins/" + symbol + "/history?date="
                        + date.substring(6) + "-" + date.substring(4, 6) + "-" + date.substring(0, 4);
                    console.log("> url:", url);
                    axios_1.default.get(url, { headers: {
                            'Content-Type': 'application/json'
                        } }).then(response => {
                        if (response.data.market_data && response.data.market_data.current_price)
                            this.prices[key] = response.data.market_data.current_price[this.pair];
                        resolve(this.prices[key]);
                    }).catch(err => { resolve(this.prices[key]); });
                });
            return this.prices[key];
        });
    }
    parseSymbolId(symbol) {
        switch (symbol) {
            case Coin_1.Coin.APE: return "apecoin";
            case Coin_1.Coin.ARTX: return "artx";
            case Coin_1.Coin.ATRI: return "atari";
            case Coin_1.Coin.BTC: return "bitcoin";
            case Coin_1.Coin.CUBE: return "somnium-space-cubes";
            case Coin_1.Coin.DAI: return "dai";
            case Coin_1.Coin.MANA: return "decentraland";
            case Coin_1.Coin.RARI: return "rarible";
            case Coin_1.Coin.SAND: return "the-sandbox";
            case Coin_1.Coin.SCOTT: return "scotty-beam";
            case Coin_1.Coin.USDC: return "usd-coin";
            case Coin_1.Coin.WBTC: return "bitcoin";
            default: return "ethereum";
        }
    }
}
exports.PriceFinder = PriceFinder;
//# sourceMappingURL=PriceFinder.js.map