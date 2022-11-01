import { Statistic } from "../Statistic";
export declare class R2 implements Statistic<number[], number> {
    apply(predictions: number[], values: number[]): number;
}
