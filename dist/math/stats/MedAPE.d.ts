import { Statistic } from "../Statistic";
export declare class MedAPE implements Statistic<number[], number> {
    apply(predictions: number[], values: number[]): number;
}
