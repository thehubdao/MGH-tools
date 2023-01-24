import { Request, Response } from "express";
import { CheckableGetRequest } from "itrm-tools";
import { StatsManager } from "./StatsManager";

export class StatsRequest extends CheckableGetRequest {
    private timestamp: number = 0;
    private analyzis: any = {};
    private statsManager: StatsManager;

    constructor(statsManager: StatsManager) {
        super({
            path: "/stats",
            params: []
        });
        this.statsManager = statsManager;
    }

    public async apply(req: Request, res: Response): Promise<any> {
        let timestamp = (new Date()).getTime();
        if (timestamp - this.timestamp > 10 * 60 * 1000) {
            this.timestamp = timestamp;
            this.analyzis = this.analize(this.statsManager.stats);
        }
        return res.status(200).json(this.analyzis);
    }

    private analize(stats: any): any {
        let result: any = {};
        for (let path of Object.keys(stats)) {
            result[path] = { history: [] };
            let values: number[] = [];
            for (let date of Object.keys(stats[path])) {
                result[path].history.push({
                    date: date,
                    total: stats[path][date].total
                });
                result[path].current_month_calls = stats[path][date].total;
                values.push(stats[path][date].total);
            }
            result[path] = { ...result[path], ...this.calculateStats(values) }
        }
        return result;
    }

    private calculateStats(values: number[]): any {
        values.sort(function(a, b) { return a - b });
        let avg = 0;
        for (let value of values)
            avg += value / values.length;
        let mid = Math.floor(values.length / 2.0);
        return {
            average: avg,
            median: (values.length % 2 == 0) ? (values[mid] + values[mid - 1]) / 2.0 : values[mid]
        };
    }
}