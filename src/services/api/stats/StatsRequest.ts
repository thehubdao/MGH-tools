import { APIRequest, RequestType } from "../APIRequest";
import { statsManager } from "./StatsManager";

export class StatsRequest extends APIRequest {
    private timestamp: number = 0;
    private analyzis: any = {};

    constructor() {
        super(RequestType.GET, '/stats');
    }

    public apply(memory: any, req: any, res: any): Promise<any> {
        let timestamp = (new Date()).getTime();
        if (timestamp - this.timestamp > 10 * 60 * 1000) {
            this.timestamp = timestamp;
            this.analyzis = this.analize(statsManager.stats);
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