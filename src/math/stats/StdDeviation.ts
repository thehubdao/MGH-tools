import { Statistic } from "../Statistic";

export class StdDeviation implements Statistic<number[], number> {
    apply(predictions: number[], values: number[]): number {
        let errors = [], avg = 0, sum = 0;
        for (let i = 0; i < predictions.length; i++) {
            let err = Math.abs((values[i] - predictions[i]) / values[i]);
            errors.push(err);
            avg += err / predictions.length;
        }
        for (let i = 0; i < errors.length; i++)
            sum += (errors[i] - avg) * (errors[i] - avg);
        return Math.sqrt(sum / (errors.length - 1));
    }
}