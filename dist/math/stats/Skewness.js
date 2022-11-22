"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Skewness = void 0;
class Skewness {
    apply(predictions, values) {
        let errors = [], avg = 0, sum = 0;
        for (let i = 0; i < predictions.length; i++) {
            let err = Math.abs((values[i] - predictions[i]) / values[i]);
            errors.push(err);
            avg += err / predictions.length;
        }
        for (let i = 0; i < errors.length; i++)
            sum += (errors[i] - avg) * (errors[i] - avg);
        let deviation = Math.sqrt(sum / (errors.length - 1));
        sum = 0;
        for (let error of errors)
            sum += Math.pow(error - avg, 3);
        return sum / ((errors.length - 1) * Math.pow(deviation, 3));
    }
}
exports.Skewness = Skewness;
//# sourceMappingURL=Skewness.js.map