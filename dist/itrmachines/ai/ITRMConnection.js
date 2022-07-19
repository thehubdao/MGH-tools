"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ITRMConnection = void 0;
const axios_1 = __importDefault(require("axios"));
class ITRMConnection {
    constructor(aiModule, modelService, domain, apiKey) {
        this.aiModule = aiModule;
        this.modelService = modelService;
        this.domain = domain;
        this.apiKey = apiKey;
    }
    findProduct(name) {
        return new Promise((resolve, reject) => {
            let url = this.aiModule + "/products/myProductsAPI/?apiKey=" + this.apiKey;
            axios_1.default.get(url, { headers: {
                    'Content-Type': 'application/json',
                    'Origin': this.domain
                } }).then(response => {
                for (let network of response.data)
                    if (network.name === name)
                        resolve(network);
                resolve(undefined);
            }).catch(err => { reject(err); });
        });
    }
    getDetails(product) {
        return new Promise((resolve, reject) => {
            let url = this.modelService + "/model/productAPI/" + product.productId + "/?apiKey=" + this.apiKey;
            axios_1.default.get(url, { headers: {
                    'Content-Type': 'application/json',
                    'Origin': this.domain
                } }).then(response => {
                resolve(response.data);
            }).catch(err => { reject(err); });
        });
    }
    getUpdates(product) {
        return new Promise((resolve, reject) => {
            this.getDetails(product).then(details => {
                resolve(details.updates);
            }).catch(err => { reject(err); });
        });
    }
    getDataset(product) {
        return new Promise((resolve, reject) => {
            this.getDetails(product).then(details => {
                resolve(details.data);
            }).catch(err => { reject(err); });
        });
    }
    getHistoricalPredictions(update) {
        return new Promise((resolve, reject) => {
            let url = this.modelService + "/modelUpdate/predictionsBatchAPI/" + update.modelUpdateId + "/?apiKey=" + this.apiKey;
            axios_1.default.post(url, {}, { headers: {
                    'Content-Type': 'application/json',
                    'Origin': this.domain
                } }).then(response => {
                resolve(response.data.predictions);
            }).catch(err => { reject(err); });
        });
    }
    getPrediction(update, input) {
        return new Promise((resolve, reject) => {
            let url = this.modelService + "/modelUpdate/predictionsAPI/" + update.modelUpdateId + "/?apiKey=" + this.apiKey;
            axios_1.default.post(url, { input: input }, { headers: {
                    'Content-Type': 'application/json',
                    'Origin': this.domain
                } }).then(response => {
                resolve(response.data);
            }).catch(err => { reject(err); });
        });
    }
    getPredictionList(update, inputs) {
        return new Promise((resolve, reject) => {
            let url = this.modelService + "/modelUpdate/predictionListAPI/" + update.modelUpdateId + "/?apiKey=" + this.apiKey;
            axios_1.default.post(url, { inputs: inputs }, { headers: {
                    'Content-Type': 'application/json',
                    'Origin': this.domain
                } }).then(response => {
                resolve(response.data);
            }).catch(err => { reject(err); });
        });
    }
}
exports.ITRMConnection = ITRMConnection;
//# sourceMappingURL=ITRMConnection.js.map