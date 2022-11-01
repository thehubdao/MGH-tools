import { Statistic } from "../Statistic";

export class MedAPE implements Statistic<number[], number> {
    apply(predictions: number[], values: number[]): number {
        let errors = [];
        for (let i = 0; i < predictions.length; i++)
            errors.push(Math.abs(predictions[i] - values[i]));
        let mid = Math.floor(errors.length / 2);
        return (errors.length % 2 == 0) ? (errors[mid] + errors[mid + 1]) / 2 : errors[mid];
    }
}