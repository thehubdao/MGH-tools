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
exports.OpenseaCollectionManager = void 0;
const axios_1 = __importDefault(require("axios"));
class OpenseaCollectionManager {
    constructor(collection, apiKey) {
        this.timestamp = 0;
        this.data = { stats: { floor_price: 0 } };
        this.collection = collection;
        this.apiKey = apiKey;
    }
    getData() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.data;
        });
    }
    update() {
        return __awaiter(this, void 0, void 0, function* () {
            let timestamp = (new Date()).getTime();
            if (timestamp - this.timestamp > 3600 * 1000) {
                this.timestamp = timestamp;
                yield this.requestStats();
            }
        });
    }
    requestStats() {
        return new Promise((resolve, reject) => {
            let url = "https://api.opensea.io/api/v1/collection/" + this.collection + "/stats";
            axios_1.default.get(url, { headers: {
                    'Content-Type': 'application/json',
                    'X-API-KEY': this.apiKey
                } }).then(response => {
                this.data = Object.assign(Object.assign({}, this.data), response.data);
                resolve(response.data);
            }).catch(err => {
                console.log("> an error has ocurred when requesting collection stats:", err);
                reject(err);
            });
        });
    }
}
exports.OpenseaCollectionManager = OpenseaCollectionManager;
//# sourceMappingURL=OpenseaCollectionManager.js.map