"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StatsRequest = void 0;
const APIRequest_1 = require("../APIRequest");
const StatsManager_1 = require("./StatsManager");
class StatsRequest extends APIRequest_1.APIRequest {
    constructor() {
        super(APIRequest_1.RequestType.GET, '/stats');
        this.timestamp = 0;
        this.analyzis = {};
    }
    apply(memory, req, res) {
        let timestamp = (new Date()).getTime();
        if (timestamp - this.timestamp > 10 * 60 * 1000) {
            this.timestamp = timestamp;
            this.analyzis = this.analize(StatsManager_1.statsManager.stats);
        }
        return res.status(200).json(this.analyzis);
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