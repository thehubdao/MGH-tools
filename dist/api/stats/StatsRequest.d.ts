import { Request, Response } from "express";
import { CheckableGetRequest } from "itrm-tools";
import { StatsManager } from "./StatsManager";
export declare class StatsRequest extends CheckableGetRequest {
    private timestamp;
    private analyzis;
    private statsManager;
    private delay;
    constructor(statsManager: StatsManager, delay: number);
    apply(req: Request, res: Response): Promise<any>;
    private analize;
    private calculateStats;
}
