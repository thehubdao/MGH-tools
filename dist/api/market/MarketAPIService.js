"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MarketAPIService = void 0;
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
const MGHAPIService_1 = require("../MGHAPIService");
class MarketAPIService extends MGHAPIService_1.MGHAPIService {
    constructor(config) {
        super(config);
        this.memory = { market: {} };
        this.memory.market.collectionManager = config.collectionManager;
        this.memory.market.tokenManager = config.tokenManager;
        this.placeRequests(this.memory.market.collectionManager, this.memory.market.tokenManager);
    }
    placeRequests(collectionManager, tokenManager) {
        this.addRequest(new CollectionRequest_1.CollectionRequest(collectionManager, tokenManager));
        this.addRequest(new CollectionCreator_1.CollectionCreator(collectionManager));
        this.addRequest(new CollectionEraser_1.CollectionEraser(collectionManager, tokenManager));
        this.addRequest(new ContractCreator_1.ContractCreator(collectionManager));
        this.addRequest(new ContractRequest_1.ContractRequest(collectionManager));
        this.addRequest(new ContractEraser_1.ContractEraser(collectionManager));
        this.addRequest(new ContractEditor_1.ContractEditor(collectionManager));
        this.addRequest(new TokenCreator_1.TokenCreator(collectionManager, tokenManager));
        this.addRequest(new TokenRequest_1.TokenRequest(collectionManager, tokenManager));
        this.addRequest(new TokenEraser_1.TokenEraser(collectionManager, tokenManager));
        this.addRequest(new ListingsRequest_1.ListingsRequest(collectionManager, tokenManager));
        this.addRequest(new OffersRequest_1.OffersRequest(collectionManager, tokenManager));
    }
}
exports.MarketAPIService = MarketAPIService;
//# sourceMappingURL=MarketAPIService.js.map