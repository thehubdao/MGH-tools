import { Request, Response } from "express";
import { CheckableDeleteRequest } from "itrm-tools";
import { CollectionManager } from "../mongoose/CollectionManager";
export declare class ContractEraser extends CheckableDeleteRequest {
    private collectionManager;
    constructor(collectionManager: CollectionManager);
    apply(req: Request, res: Response): Promise<any>;
}
