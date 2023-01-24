import { IContract } from '../api/market/mongoose/CollectionManager';
import { IToken } from '../api/market/mongoose/TokenManager';
export interface OpenseaAPIConnectionConfig {
    waitingTime: number;
    coolingTime: number;
}
export declare class OpenseaAPIConnection {
    private apiKey;
    private config;
    constructor(apiKey: string, config: OpenseaAPIConnectionConfig);
    requestOrders(type: string, contract: IContract, tokens: IToken[]): Promise<any>;
    private buildTokensSuffix;
    private request;
}
