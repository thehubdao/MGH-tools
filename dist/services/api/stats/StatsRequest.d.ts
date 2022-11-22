import { APIRequest } from "../APIRequest";
export declare class StatsRequest extends APIRequest {
    private timestamp;
    private analyzis;
    constructor();
    apply(memory: any, req: any, res: any): Promise<any>;
    private analize;
    private calculateStats;
}
