"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MedAPE = void 0;
class MedAPE {
    apply(predictions, values) {
        let errors = [];
        for (let i = 0; i < predictions.length; i++)
            errors.push(Math.abs(predictions[i] - values[i]));
        let mid = Math.floor(errors.length / 2);
        return (errors.length % 2 == 0) ? (errors[mid] + errors[mid + 1]) / 2 : errors[mid];
    }
}
exports.MedAPE = MedAPE;
//# sourceMappingURL=MedAPE.js.map