import { Request, Response } from "express";
import { CheckablePostRequest } from "itrm-tools";
import { CollectionManager } from "../mongoose/CollectionManager";
import { TokenManager } from "../mongoose/TokenManager";
export declare class TokenCreator extends CheckablePostRequest {
    private collectionManager;
    private tokenManager;
    constructor(collectionManager: CollectionManager, tokenManager: TokenManager);
    apply(req: Request, res: Response): Promise<any>;
}
