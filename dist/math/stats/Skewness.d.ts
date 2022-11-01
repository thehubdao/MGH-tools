import { Statistic } from "../Statistic";
export declare class Skewness implements Statistic<number[], number> {
    apply(predictions: number[], values: number[]): number;
}
