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
Object.defineProperty(exports, "__esModule", { value: true });
exports.SimpleITRMConnection = void 0;
class SimpleITRMConnection {
    constructor(connection) {
        this.connection = connection;
    }
    getPrediction(modelUpdateId, input) {
        return new Promise((resolve, reject) => {
            this.connection.getPrediction(modelUpdateId, input).then(response => {
                resolve(response);
            }).catch(err => {
                console.log("> An error has ocurred:", err);
                resolve(undefined);
            });
        });
    }
    getPredictionList(modelUpdateId, inputs) {
        return new Promise((resolve, reject) => {
            this.connection.getPredictionList(modelUpdateId, inputs).then(response => {
                resolve(response);
            }).catch(err => {
                console.log("> An error has ocurred:", err);
                resolve(undefined);
            });
        });
    }
    getUpdates(product) {
        return new Promise((resolve, reject) => {
            this.connection.getUpdates(product).then(response => {
                resolve(response);
            }).catch(err => {
                console.log("> An error has ocurred:", err);
                resolve(undefined);
            });
        });
    }
    getHistoricalPredictions(update) {
        return new Promise((resolve, reject) => {
            this.connection.getHistoricalPredictions(update).then(response => {
                resolve(response);
            }).catch(err => {
                console.log("> An error has ocurred:", err);
                resolve(undefined);
            });
        });
    }
    requestProduct(name) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                console.log("> requesting product:", name);
                this.connection.findProduct(name).then(response => {
                    resolve(response);
                }).catch(err => {
                    console.log("> An error has ocurred:", err);
                    resolve(undefined);
                });
            });
        });
    }
}
exports.SimpleITRMConnection = SimpleITRMConnection;
//# sourceMappingURL=SimpleITRMConnection.js.map