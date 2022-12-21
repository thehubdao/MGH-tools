"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MarketAPIService = void 0;
const CollectionManager_1 = require("./mongoose/CollectionManager");
const TokenManager_1 = require("./mongoose/TokenManager");
const APIService_1 = require("../APIService");
const CollectionCreator_1 = require("./requests/CollectionCreator");
const CollectionEraser_1 = require("./requests/CollectionEraser");
const CollectionRequest_1 = require("./requests/CollectionRequest");
const ContractCreator_1 = require("./requests/ContractCreator");
const ContractEditor_1 = require("./requests/ContractEditor");
const ContractEraser_1 = require("./requests/ContractEraser");
const ContractRequest_1 = require("./requests/ContractRequest");
const TokenCreator_1 = require("./requests/TokenCreator");
const TokenRequest_1 = require("./requests/TokenRequest");
const TokenEraser_1 = require("./requests/TokenEraser");
const ListingsRequest_1 = require("./requests/ListingsRequest");
const OffersRequest_1 = require("./requests/OffersRequest");
class MarketAPIService extends APIService_1.APIService {
    constructor(config) {
        super(config);
        APIService_1.MGHToolsGlobal.serviceSettings.memory.market = {
            collectionManager: new CollectionManager_1.CollectionManager(config.collectionDatabase),
            tokenManager: new TokenManager_1.TokenManager(config.tokenDatabase)
        };
        this.placeRequests();
    }
    placeRequests() {
        this.addRequest(new CollectionRequest_1.CollectionRequest());
        this.addRequest(new CollectionCreator_1.CollectionCreator());
        this.addRequest(new CollectionEraser_1.CollectionEraser());
        this.addRequest(new ContractCreator_1.ContractCreator());
        this.addRequest(new ContractRequest_1.ContractRequest());
        this.addRequest(new ContractEraser_1.ContractEraser());
        this.addRequest(new ContractEditor_1.ContractEditor());
        this.addRequest(new TokenCreator_1.TokenCreator());
        this.addRequest(new TokenRequest_1.TokenRequest());
        this.addRequest(new TokenEraser_1.TokenEraser());
        this.addRequest(new ListingsRequest_1.ListingsRequest());
        this.addRequest(new OffersRequest_1.OffersRequest());
    }
}
exports.MarketAPIService = MarketAPIService;
//# sourceMappingURL=MarketAPIService.js.map