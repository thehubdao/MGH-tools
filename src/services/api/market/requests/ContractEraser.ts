import { APIRequest, RequestType } from "../../APIRequest";

export class ContractEraser extends APIRequest {
    constructor() {
        super(RequestType.DELETE, '/collections/:name/contracts/:chain');
    }

    public async apply(memory: any, req: any, res: any): Promise<any> {
        const { name, chain } = req.params;
        let collection = await memory.market.collectionManager.find(name);
        if (collection) {
            for (let i = 0; i < collection.contracts.length; i++)
                if (collection.contracts[i].chain === chain)
                    collection.contracts.splice(i, 1);
            await memory.market.collectionManager.update(collection);
            return res.status(200).json({ message: "Contract deleted" });
        }
        return res.status(400).send({ err: "Collection '" + name + "' was not found" });
    }
}