"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.R2 = void 0;
class R2 {
    apply(predictions, values) {
        let avg = 0, ss_res = 0, ss_tot = 0;
        for (let i = 0; i < values.length; i++)
            avg += values[i] / values.length;
        for (let i = 0; i < predictions.length; i++) {
            ss_res += Math.pow(predictions[i] - values[i], 2);
            ss_tot += Math.pow(avg - values[i], 2);
        }
        return 1.0 - (ss_res / ss_tot);
    }
}
exports.R2 = R2;
//# sourceMappingURL=R2.js.map