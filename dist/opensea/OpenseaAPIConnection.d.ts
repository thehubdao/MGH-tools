import { IContract } from '../services/api/market/mongoose/CollectionManager';
import { IToken } from '../services/api/market/mongoose/TokenManager';
export declare class OpenseaAPIConnection {
    private apiKey;
    constructor(apiKey: string);
    requestOrders(type: string, contract: IContract, tokens: IToken[]): Promise<any>;
    private buildTokensSuffix;
    private request;
}
