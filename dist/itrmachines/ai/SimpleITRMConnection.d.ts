import { ITRMConnection } from "./ITRMConnection";
export declare class SimpleITRMConnection {
    private connection;
    constructor(connection: ITRMConnection);
    getPrediction(modelUpdateId: any, input: any): Promise<any>;
    getPredictionList(modelUpdateId: any, inputs: any[]): Promise<any>;
    getUpdates(product: any): Promise<any>;
    getHistoricalPredictions(update: any): Promise<any>;
    requestProduct(name: string): Promise<any>;
}
