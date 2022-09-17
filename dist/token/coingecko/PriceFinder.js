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
exports.PriceFinder = exports.Coin = void 0;
const axios_1 = __importDefault(require("axios"));
var Coin;
(function (Coin) {
    Coin[Coin["ATRI"] = 0] = "ATRI";
    Coin[Coin["BTC"] = 1] = "BTC";
    Coin[Coin["CUBE"] = 2] = "CUBE";
    Coin[Coin["DAI"] = 3] = "DAI";
    Coin[Coin["ETH"] = 4] = "ETH";
    Coin[Coin["MANA"] = 5] = "MANA";
    Coin[Coin["RARI"] = 6] = "RARI";
    Coin[Coin["SAND"] = 7] = "SAND";
    Coin[Coin["SCOTT"] = 8] = "SCOTT";
    Coin[Coin["USDC"] = 9] = "USDC";
    Coin[Coin["WBTC"] = 10] = "WBTC";
    Coin[Coin["WETH"] = 11] = "WETH";
})(Coin = exports.Coin || (exports.Coin = {}));
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
            if (symbol == Coin.CUBE)
                key = Math.max(key, 20200221);
            return yield this.findPrice(id, "" + key);
        });
    }
    findPrice(symbol, date) {
        return __awaiter(this, void 0, void 0, function* () {
            let key = symbol + "_" + date;
            if (this.prices[key])
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
exports.PriceFinder = PriceFinder;
//# sourceMappingURL=PriceFinder.js.map