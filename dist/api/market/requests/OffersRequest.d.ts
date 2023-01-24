import { Request, Response } from "express";
import { CheckableGetRequest } from "itrm-tools";
import { CollectionManager } from "../mongoose/CollectionManager";
import { TokenManager } from "../mongoose/TokenManager";
export declare class OffersRequest extends CheckableGetRequest {
    private collectionManager;
    private tokenManager;
    constructor(collectionManager: CollectionManager, tokenManager: TokenManager);
    apply(req: Request, res: Response): Promise<any>;
    private clean;
}
