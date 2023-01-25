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
exports.StatsRequest = void 0;
const itrm_tools_1 = require("itrm-tools");
class StatsRequest extends itrm_tools_1.CheckableGetRequest {
    constructor(statsManager, delay) {
        super({
            path: "/stats",
            params: []
        });
        this.timestamp = 0;
        this.analyzis = {};
        this.statsManager = statsManager;
        this.delay = delay;
    }
    apply(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let timestamp = (new Date()).getTime();
            if (timestamp - this.timestamp > this.delay) {
                this.timestamp = timestamp;
                this.analyzis = this.analize(this.statsManager.stats);
            }
            return res.status(200).json(this.analyzis);
        });
    }
    analize(stats) {
        let result = {};
        for (let path of Object.keys(stats)) {
            result[path] = { history: [] };
            let values = [];
            for (let date of Object.keys(stats[path])) {
                result[path].history.push({
                    date: date,
                    total: stats[path][date].total
                });
                result[path].current_month_calls = stats[path][date].total;
                values.push(stats[path][date].total);
            }
            result[path] = Object.assign(Object.assign({}, result[path]), this.calculateStats(values));
        }
        return result;
    }
    calculateStats(values) {
        values.sort(function (a, b) { return a - b; });
        let avg = 0;
        for (let value of values)
            avg += value / values.length;
        let mid = Math.floor(values.length / 2.0);
        return {
            average: avg,
            median: (values.length % 2 == 0) ? (values[mid] + values[mid - 1]) / 2.0 : values[mid]
        };
    }
}
exports.StatsRequest = StatsRequest;
//# sourceMappingURL=StatsRequest.js.map