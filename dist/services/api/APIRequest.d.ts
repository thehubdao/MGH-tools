import { Request, Response } from 'express';
export declare enum RequestType {
    GET = 0,
    POST = 1,
    PUT = 2
}
export declare abstract class APIRequest {
    type: RequestType;
    path: string;
    constructor(type: RequestType, path: string);
    abstract apply(memory: any, req: Request, res: Response): Promise<any>;
}
