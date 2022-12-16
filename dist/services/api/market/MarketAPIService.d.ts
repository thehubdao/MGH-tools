import { APIService, APIServiceConfig } from "../APIService";
export interface MarketAPIServiceConfig extends APIServiceConfig {
    collectionDatabase: string;
    tokenDatabase: string;
}
export declare class MarketAPIService extends APIService {
    constructor(config: MarketAPIServiceConfig);
    private placeRequests;
}
