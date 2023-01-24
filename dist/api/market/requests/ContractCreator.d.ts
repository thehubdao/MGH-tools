import { Request, Response } from "express";
import { CheckablePostRequest } from "itrm-tools";
import { CollectionManager } from "../mongoose/CollectionManager";
export declare class ContractCreator extends CheckablePostRequest {
    private collectionManager;
    constructor(collectionManager: CollectionManager);
    apply(req: Request, res: Response): Promise<any>;
    private addContract;
    private checkExistance;
}
