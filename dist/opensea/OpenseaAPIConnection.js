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
exports.OpenseaAPIConnection = void 0;
const axios_1 = __importDefault(require("axios"));
const TokenTools_1 = require("../token/TokenTools");
class OpenseaAPIConnection {
    constructor(apiKey) {
        this.apiKey = apiKey;
    }
    requestOrders(type, contract, tokens) {
        return __awaiter(this, void 0, void 0, function* () {
            let url = `https://api.opensea.io/v2/orders/${contract.chain}/seaport/${type}?asset_contract_address=${contract.address}${this.buildTokensSuffix(tokens)}`;
            for (let attemp = 1; attemp < 10; attemp++) {
                let response = yield this.request(url);
                if (response)
                    return response;
            }
            return [];
        });
    }
    buildTokensSuffix(tokens) {
        let result = "";
        for (let token of tokens)
            result += "&token_ids=" + token.tokenId;
        return result;
    }
    request(url) {
        return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
            (0, TokenTools_1.waitFor)(100);
            axios_1.default.get(url, { headers: {
                    'Content-Type': 'application/json',
                    'X-API-KEY': this.apiKey,
                    "Accept-Encoding": "*"
                } }).then(response => {
                var _a;
                resolve((_a = response.data) === null || _a === void 0 ? void 0 : _a.orders);
            }).catch(err => {
                console.log("> an error has ocurred when requesting orders:", err.response);
                (0, TokenTools_1.waitFor)(3000);
                resolve(undefined);
            });
        }));
    }
}
exports.OpenseaAPIConnection = OpenseaAPIConnection;
//# sourceMappingURL=OpenseaAPIConnection.js.map