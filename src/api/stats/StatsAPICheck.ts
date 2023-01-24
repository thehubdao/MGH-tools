import { Request } from "express";
import { APICheck, APICheckConfig, APICheckResult } from "itrm-tools";
import { StatsManager } from "./StatsManager";

export class StatsAPICheck implements APICheck {
    private service: string;
    private statsManager: StatsManager;

    constructor(service: string, statsManager: StatsManager) {
        this.service = service;
        this.statsManager = statsManager;
    }

    public getConfig(): APICheckConfig {
        return {
            check: 'stats check'
        };
    }

    public async apply(config: APICheckConfig, req: Request): Promise<APICheckResult> {
        try {
            await this.statsManager.count(this.service, req.route.path);
            return { approved: true };
        } catch(err) {
            return {
                approved: false,
                rejection: {
                    code: 500,
                    payload: { message: config.check + " fail when counting", error: err }
                }
            };
        }
    }
}