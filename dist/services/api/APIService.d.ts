import { Express, Request, Response } from 'express';
import { Service } from "../Service";
import { APIRequest } from './APIRequest';
export declare namespace MGHToolsGlobal {
    var serviceSettings: any;
}
export interface APIServiceConfig {
    service: string;
    port: string;
    database: string;
}
export declare class APIService implements Service {
    protected app: Express;
    protected config: APIServiceConfig;
    constructor(config: APIServiceConfig);
    addRequest(request: APIRequest): void;
    apply(req: Request, res: Response): Promise<any>;
    run(init: Function): Promise<any>;
    update(): Promise<void>;
}
