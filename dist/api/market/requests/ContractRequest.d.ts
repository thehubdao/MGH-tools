import { Request, Response } from "express";
import { CheckableGetRequest } from "itrm-tools";
import { CollectionManager } from "../mongoose/CollectionManager";
export declare class ContractRequest extends CheckableGetRequest {
    private collectionManager;
    constructor(collectionManager: CollectionManager);
    apply(req: Request, res: Response): Promise<any>;
    private clean;
}
