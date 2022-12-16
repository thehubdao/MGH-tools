import { APIRequest } from "../../APIRequest";
export declare class ContractCreator extends APIRequest {
    constructor();
    apply(memory: any, req: any, res: any): Promise<any>;
    private addContract;
    private checkExistance;
}
