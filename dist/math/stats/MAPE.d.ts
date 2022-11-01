import { Statistic } from "../Statistic";
export declare class MAPE implements Statistic<number[], number> {
    apply(predictions: number[], values: number[]): number;
}
