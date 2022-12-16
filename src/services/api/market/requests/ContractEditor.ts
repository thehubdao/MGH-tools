import { APIRequest, RequestType } from "../../APIRequest";

export class ContractEditor extends APIRequest {
    constructor() {
        super(RequestType.PUT, '/collections/:name/contracts/:chain');
    }

    public async apply(memory: any, req: any, res: any): Promise<any> {
        const { name, chain } = req.params;
        const { address } = req.body;
        if (!address)
            return res.status(400).send({ err: "property 'address' was not found in body" });
        let collection = await memory.market.collectionManager.find(name);
        if (collection) {
            for (let contract of collection.contracts)
                if (contract.chain === chain)
                    contract.address = address;
            await memory.market.collectionManager.update(collection);
            return res.status(200).json({ message: "Contract updated" });
        }
        return res.status(400).send({ err: "Collection '" + name + "' was not found" });
    }
}