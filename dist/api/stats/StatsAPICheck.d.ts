import { Request } from "express";
import { APICheck, APICheckConfig, APICheckResult } from "itrm-tools";
import { StatsManager } from "./StatsManager";
export declare class StatsAPICheck implements APICheck {
    private service;
    private statsManager;
    constructor(service: string, statsManager: StatsManager);
    getConfig(): APICheckConfig;
    apply(config: APICheckConfig, req: Request): Promise<APICheckResult>;
}
