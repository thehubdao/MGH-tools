import { CollectionManager } from "./mongoose/CollectionManager";
import { TokenManager } from "./mongoose/TokenManager";
import { MGHAPIService, MGHServiceConfig } from "../MGHAPIService";
export interface MarketAPIServiceConfig extends MGHServiceConfig {
    collectionManager: CollectionManager;
    tokenManager: TokenManager;
}
export declare class MarketAPIService extends MGHAPIService {
    memory: any;
    constructor(config: MarketAPIServiceConfig);
    private placeRequests;
}
