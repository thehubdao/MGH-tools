import { Request, Response } from 'express';

export enum RequestType {
    GET = "GET",
    POST = "POST",
    PUT = "PUT",
    DELETE = "DELETE"
}

export abstract class APIRequest {
    public type: RequestType;
    public path: string;

    constructor(type: RequestType, path: string) {
        this.type = type;
        this.path = path;
    }

    public abstract apply(memory: any, req: Request, res: Response): Promise<any>;
}