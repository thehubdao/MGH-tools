export declare class ITRMConnection {
    private aiModule;
    private modelService;
    private domain;
    private apiKey;
    constructor(aiModule: string, modelService: string, domain: string, apiKey: string);
    findProduct(name: string): Promise<any>;
    getDetails(product: any): Promise<any>;
    getUpdates(product: any): Promise<any>;
    getDataset(product: any): Promise<any>;
    getHistoricalPredictions(update: any): Promise<any>;
    getPrediction(update: any, input: any): Promise<any>;
    getPredictionList(update: any, inputs: any[]): Promise<any>;
}
