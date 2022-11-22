import { Express, Request, Response } from 'express';
import { Service } from "../Service";
import { APIRequest } from './APIRequest';
export declare namespace MGHToolsGlobal {
    var serviceSettings: any;
}
export declare class APIService implements Service {
    protected app: Express;
    protected port: string;
    protected service: string;
    protected database: string;
    constructor(service: string, port: string, database: string);
    addRequest(request: APIRequest): void;
    apply(req: Request, res: Response): Promise<any>;
    run(init: Function): Promise<any>;
    update(): Promise<void>;
}
