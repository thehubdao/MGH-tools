import { IContract } from "../mongoose/CollectionManager";
import { APIRequest, RequestType } from "../../APIRequest";

export class ContractRequest extends APIRequest {
    constructor() {
        super(RequestType.GET, '/collections/:name/contracts');
    }

    public async apply(memory: any, req: any, res: any): Promise<any> {
        const { name } = req.params;
        let collection = await memory.market.collectionManager.find(name);
        if (collection)
            return res.status(200).json({ contracts: this.clean(collection.contracts) });
        return res.status(400).send({ err: "Collection '" + name + "' was not found" });
    }

    private clean(contracts: IContract[]): any {
        let result: IContract[] = [];
        for (let contract of contracts)
            result.push({ chain: contract.chain, address: contract.address });
        return result;
    }
}