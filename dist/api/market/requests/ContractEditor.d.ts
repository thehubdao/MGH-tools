import { Request, Response } from "express";
import { CheckablePutRequest } from "itrm-tools";
import { CollectionManager } from "../mongoose/CollectionManager";
export declare class ContractEditor extends CheckablePutRequest {
    private collectionManager;
    constructor(collectionManager: CollectionManager);
    apply(req: Request, res: Response): Promise<any>;
}
