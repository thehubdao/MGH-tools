import { MongooseModelManager } from "itrm-tools";

export interface IMonthlyStat {
    service: string,
    endpoint: string,
    date: number,
    total: number
}

export class StatsManager extends MongooseModelManager<IMonthlyStat> {
    public stats: any = {};
    private initialized: boolean = false;

    constructor(collection: string) {
        super(collection, {
            service: { type: String, required: true },
            endpoint: { type: String, required: true },
            date: { type: Number, required: true },
            total: { type: Number, required: true },
        });
    }

    public findManyByService(service: string) {
        return super.findMany({ service: { $in: [service] } });
    }

    public updateMany(stats: any[]) {
        let writes: any[] = [];
        for (let stat of stats) {
            writes.push({
                updateOne: {
                    filter: {
                        service: stat.service,
                        endpoint: stat.endpoint,
                        date: stat.date
                    }, update: {
                        total: stat.total
                    }
                }
            });
        }
        return super.bulkWrite(writes);
    }

    public async init(service: string) {
        let stats = await this.findManyByService(service);
        for (let stat of stats) {
            if (!this.stats[stat.endpoint])
                this.stats[stat.endpoint] = {};
            this.stats[stat.endpoint][stat.date] = stat;
        }
        this.initialized = true;
    }

    public async count(service: string, path: string) {
        if (this.initialized) {
            let date = new Date();
            let month = (10000 * date.getFullYear()) + (100 * (1 + date.getMonth())) + 1;
            if (!this.stats[path])
                this.stats[path] = {};
            if (!this.stats[path][month]) {
                this.stats[path][month] = {
                    service: service,
                    endpoint: path,
                    date: month,
                    total: 1
                };
                await this.create(this.stats[path][month]);
            } else
                this.stats[path][month].total++;
        }
    }

    public save() {
        let date = new Date();
        let month = (10000 * date.getUTCFullYear()) + (100 * (1 + date.getUTCMonth())) + 1;
        let buffer = [];
        for (let path of Object.keys(this.stats))
            if (this.stats[path][month])
                buffer.push(this.stats[path][month]);
        return this.updateMany(buffer);
    }
}