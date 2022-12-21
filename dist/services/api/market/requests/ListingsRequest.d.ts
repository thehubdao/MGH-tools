import { APIRequest } from "../../APIRequest";
export declare class ListingsRequest extends APIRequest {
    constructor();
    apply(memory: any, req: any, res: any): Promise<any>;
    private clean;
}
