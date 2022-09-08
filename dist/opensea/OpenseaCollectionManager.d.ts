export declare class OpenseaCollectionManager {
    private timestamp;
    private collection;
    private apiKey;
    private data;
    constructor(collection: string, apiKey: string);
    getData(): Promise<any>;
    update(): Promise<void>;
    private requestStats;
}
