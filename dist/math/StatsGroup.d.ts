import { Statistic } from "./Statistic";
export declare class StatsGroup<P, O> {
    private stats;
    addStatistic(key: string, statistic: Statistic<P, O>): void;
    apply(predictions: P, values: P): any;
}
