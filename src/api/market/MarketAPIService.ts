import { CollectionManager } from "./mongoose/CollectionManager";
import { TokenManager } from "./mongoose/TokenManager";
import { CollectionCreator } from "./requests/CollectionCreator";
import { CollectionEraser } from "./requests/CollectionEraser";
import { CollectionRequest } from "./requests/CollectionRequest";
import { ContractCreator } from "./requests/ContractCreator";
import { ContractEditor } from "./requests/ContractEditor";
import { ContractEraser } from "./requests/ContractEraser";
import { ContractRequest } from "./requests/ContractRequest";
import { TokenCreator } from "./requests/TokenCreator";
import { TokenRequest } from "./requests/TokenRequest";
import { TokenEraser } from "./requests/TokenEraser";
import { ListingsRequest } from "./requests/ListingsRequest";
import { OffersRequest } from "./requests/OffersRequest";
import { MGHAPIService, MGHServiceConfig } from "../MGHAPIService";

export interface MarketAPIServiceConfig extends MGHServiceConfig {
    collectionDatabase: string,
    tokenDatabase: string
}

export class MarketAPIService extends MGHAPIService {
    constructor(config: MarketAPIServiceConfig) {
        super(config);
        this.placeRequests(
            new CollectionManager(config.collectionDatabase),
            new TokenManager(config.tokenDatabase)
        );
    }

    private placeRequests(collectionManager: CollectionManager, tokenManager: TokenManager) {
        this.addRequest(new CollectionRequest(collectionManager, tokenManager));
        this.addRequest(new CollectionCreator(collectionManager));
        this.addRequest(new CollectionEraser(collectionManager, tokenManager));
        this.addRequest(new ContractCreator(collectionManager));
        this.addRequest(new ContractRequest(collectionManager));
        this.addRequest(new ContractEraser(collectionManager));
        this.addRequest(new ContractEditor(collectionManager));
        this.addRequest(new TokenCreator(collectionManager, tokenManager));
        this.addRequest(new TokenRequest(collectionManager, tokenManager));
        this.addRequest(new TokenEraser(collectionManager, tokenManager));
        this.addRequest(new ListingsRequest(collectionManager, tokenManager));
        this.addRequest(new OffersRequest(collectionManager, tokenManager))
    }
}