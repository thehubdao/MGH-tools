export { Service as Service } from './services/Service';

export { APIService as APIService, APIServiceConfig as APIServiceConfig } from './services/api/APIService';
export { APIRequest as APIRequest } from './services/api/APIRequest';
export { RequestType as RequestType } from './services/api/APIRequest';
export { MGHToolsGlobal as MGHToolsGlobal } from './services/api/APIService';
export { MarketAPIService as MarketAPIService, MarketAPIServiceConfig as MarketAPIServiceConfig } from './services/api/market/MarketAPIService';
export { CollectionCreator as CollectionCreator } from './services/api/market/requests/CollectionCreator';
export { CollectionEraser as CollectionEraser } from './services/api/market/requests/CollectionEraser';
export { CollectionRequest as CollectionRequest } from './services/api/market/requests/CollectionRequest';
export { ContractCreator as ContractCreator } from './services/api/market/requests/ContractCreator';
export { ContractEditor as ContractEditor } from './services/api/market/requests/ContractEditor';
export { ContractEraser as ContractEraser } from './services/api/market/requests/ContractEraser';
export { ContractRequest as ContractRequest } from './services/api/market/requests/ContractRequest';
export { TokenCreator as TokenCreator } from './services/api/market/requests/TokenCreator';
export { TokenRequest as TokenRequest } from './services/api/market/requests/TokenRequest';

export { ITRMConnection as ITRMConnection } from './itrmachines/ai/ITRMConnection';
export { SimpleITRMConnection as SimpleITRMConnection } from './itrmachines/ai/SimpleITRMConnection';
export { Logger as Logger } from './itrmachines/log/Logger';
export { LoggerManager as LoggerManager } from './itrmachines/log/LoggerManager';
export { LoggerWebSocket as LoggerWebSocket } from './itrmachines/log/LoggerWebSocket';

export { ModelManager as ModelManager } from './mongoose/ModelManager';

export { OpenseaCollectionManager as OpenseaCollectionManager } from './opensea/OpenseaCollectionManager';

export { Coin as Coin } from './token/coingecko/Coin';
export { PriceFinder as PriceFinder } from './token/coingecko/PriceFinder';
export { IContract as IContract, ICollection as ICollection, CollectionManager as CollectionManager } from './services/api/market/mongoose/CollectionManager';
export { TokenManager as TokenManager, IPrice as IPrice, ISale as ISale, IOrder as IOrder, IMaker as IMaker } from './services/api/market/mongoose/TokenManager';
export { HistoricalTransaction as HistoricalTransaction } from './token/TokenDefinitions';
export { TokenizedModelManager as TokenizedModelManager } from './token/TokenizedModelManager';
export { getVariation as getVariation } from './token/TokenTools';
export { findOldestPrice as findOldestPrice } from './token/TokenTools';
export { isValidTokenId as isValidTokenId } from './token/TokenTools';
export { waitFor as waitFor } from './token/TokenTools';

export { Statistic as Statistic } from './math/Statistic';
export { StatsGroup as StatsGroup } from './math/StatsGroup';
export { MAPE as MAPE } from './math/stats/MAPE';
export { MedAPE as MedAPE } from './math/stats/MedAPE';
export { R2 as R2 } from './math/stats/R2';
export { Skewness as Skewness } from './math/stats/Skewness';
export { StdDeviation as StdDeviation } from './math/stats/StdDeviation';