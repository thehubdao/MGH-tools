import { Statistic } from "../Statistic";

export class MAPE implements Statistic<number[], number> {
    apply(predictions: number[], values: number[]): number {
        let sum = 0;
        for (let i = 0; i < predictions.length; i++)
            sum += Math.abs((values[i] - predictions[i]) / values[i]);
        return sum / predictions.length;
    }
}