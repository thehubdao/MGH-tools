import { MGHAPIService, MGHServiceConfig } from "../MGHAPIService";
export interface MarketAPIServiceConfig extends MGHServiceConfig {
    collectionDatabase: string;
    tokenDatabase: string;
}
export declare class MarketAPIService extends MGHAPIService {
    constructor(config: MarketAPIServiceConfig);
    private placeRequests;
}
