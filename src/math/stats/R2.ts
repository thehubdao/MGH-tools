import { Statistic } from "../Statistic";

export class R2 implements Statistic<number[], number> {
    apply(predictions: number[], values: number[]): number {
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