"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MAPE = void 0;
class MAPE {
    apply(predictions, values) {
        let sum = 0;
        for (let i = 0; i < predictions.length; i++)
            sum += Math.abs((values[i] - predictions[i]) / values[i]);
        return sum / predictions.length;
    }
}
exports.MAPE = MAPE;
//# sourceMappingURL=MAPE.js.map