import { CollectionManager } from "./mongoose/CollectionManager";
import { TokenManager } from "./mongoose/TokenManager";
import { APIService, APIServiceConfig, MGHToolsGlobal } from "../APIService";
import { CollectionCreator } from "./requests/CollectionCreator";
import { CollectionEraser } from "./requests/CollectionEraser";
import { CollectionRequest } from "./requests/CollectionRequest";
import { ContractCreator } from "./requests/ContractCreator";
import { ContractEditor } from "./requests/ContractEditor";
import { ContractEraser } from "./requests/ContractEraser";
import { ContractRequest } from "./requests/ContractRequest";
import { TokenCreator } from "./requests/TokenCreator";
import { TokenRequest } from "./requests/TokenRequest";

export interface MarketAPIServiceConfig extends APIServiceConfig {
    collectionDatabase: string,
    tokenDatabase: string
}

export class MarketAPIService extends APIService {
    constructor(config: MarketAPIServiceConfig) {
        super(config);
        MGHToolsGlobal.serviceSettings.memory.market = {
            collectionManager: new CollectionManager(config.collectionDatabase),
            tokenManager: new TokenManager(config.tokenDatabase)
        };
        this.placeRequests();
    }

    private placeRequests() {
        this.addRequest(new CollectionRequest());
        this.addRequest(new CollectionCreator());
        this.addRequest(new CollectionEraser());
        this.addRequest(new ContractCreator());
        this.addRequest(new ContractRequest());
        this.addRequest(new ContractEraser());
        this.addRequest(new ContractEditor());
        this.addRequest(new TokenCreator());
        this.addRequest(new TokenRequest());
    }
}