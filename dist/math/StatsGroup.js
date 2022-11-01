"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StatsGroup = void 0;
class StatsGroup {
    constructor() {
        this.stats = {};
    }
    addStatistic(key, statistic) {
        this.stats[key] = statistic;
    }
    apply(predictions, values) {
        let result = {};
        for (let key of Object.keys(this.stats))
            result[key] = this.stats[key].apply(predictions, values);
        return result;
    }
}
exports.StatsGroup = StatsGroup;
//# sourceMappingURL=StatsGroup.js.map