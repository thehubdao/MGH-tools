export declare class MongooseManager {
    private url;
    managers: any;
    constructor(mongoUrl: string, database: string);
    connect(): Promise<void>;
}
