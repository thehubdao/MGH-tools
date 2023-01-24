import { APIService, APIServiceConfig, APIServiceResponse, CheckableAPIRequest } from "itrm-tools";
export interface MGHServiceConfig extends APIServiceConfig {
    database: string;
}
export declare class MGHAPIService extends APIService {
    private statsCheck;
    private database;
    private statsManager;
    constructor(config: MGHServiceConfig);
    init(): void;
    addRequest(request: CheckableAPIRequest): void;
    run(init: Function): Promise<APIServiceResponse>;
    update(): Promise<void>;
}
