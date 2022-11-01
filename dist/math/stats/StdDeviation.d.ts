import { Statistic } from "../Statistic";
export declare class StdDeviation implements Statistic<number[], number> {
    apply(predictions: number[], values: number[]): number;
}
