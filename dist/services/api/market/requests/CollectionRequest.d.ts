import { APIRequest } from "../../APIRequest";
export declare class CollectionRequest extends APIRequest {
    constructor();
    apply(memory: any, req: any, res: any): Promise<any>;
    private getCollectionInfo;
}
