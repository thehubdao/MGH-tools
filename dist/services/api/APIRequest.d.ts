import { Request, Response } from 'express';
export declare enum RequestType {
    GET = "GET",
    POST = "POST",
    PUT = "PUT",
    DELETE = "DELETE"
}
export declare abstract class APIRequest {
    type: RequestType;
    path: string;
    constructor(type: RequestType, path: string);
    abstract apply(memory: any, req: Request, res: Response): Promise<any>;
}
