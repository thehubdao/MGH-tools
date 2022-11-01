import { Statistic } from "./Statistic";

export class StatsGroup<P, O> {
    private stats: any = {};

    public addStatistic(key: string, statistic: Statistic<P, O>) {
        this.stats[key] = statistic;
    }

    public apply(predictions: P, values: P): any {
        let result: any = {};
        for (let key of Object.keys(this.stats))
            result[key] = this.stats[key].apply(predictions, values);
        return result;
    }
}