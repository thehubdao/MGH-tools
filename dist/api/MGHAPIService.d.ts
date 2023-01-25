import { APIService, APIServiceConfig, APIServiceResponse, CheckableAPIRequest } from "itrm-tools";
import { StatsManager } from "./stats/StatsManager";
export interface MGHServiceConfig extends APIServiceConfig {
    database: string;
    delay?: number;
}
export declare class MGHAPIService extends APIService {
    private statsCheck;
    private database;
    private statsManager;
    private delay;
    constructor(config: MGHServiceConfig);
    getStatsManager(): StatsManager;
    init(): void;
    addRequest(request: CheckableAPIRequest): void;
    run(init: Function): Promise<APIServiceResponse>;
    close(finish: Function): Promise<APIServiceResponse>;
    update(): Promise<void>;
}
