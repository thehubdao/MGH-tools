import { APIRequest } from "../../APIRequest";
export declare class TokenRequest extends APIRequest {
    constructor();
    apply(memory: any, req: any, res: any): Promise<any>;
    private clean;
    private cleanToken;
    private cleanOrders;
    private cleanSale;
    private cleanPrice;
}
