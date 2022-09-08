import { ITRMConnection } from "./ITRMConnection";
export declare class SimpleITRMConnection {
    private connection;
    constructor(connection: ITRMConnection);
    getPrediction(update: any, input: any): Promise<any>;
    getPredictionList(update: any, inputs: any[]): Promise<any>;
    getUpdates(product: any): Promise<any>;
    getHistoricalPredictions(update: any): Promise<any>;
    requestProduct(name: string): Promise<any>;
}
