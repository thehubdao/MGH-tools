import { APIRequest, RequestType } from "../../APIRequest";

export class CollectionEraser extends APIRequest {
    constructor() {
        super(RequestType.DELETE, '/collections/:name');
    }

    public async apply(memory: any, req: any, res: any): Promise<any> {
        const { name } = req.params;
        let collection = await memory.market.collectionManager.find(name);
        if (collection) {
            await memory.market.collectionManager.delete(collection.name);
            await memory.market.tokenManager.delete(collection.name);
            return res.status(200).json({ message: "Collection deleted" });
        }
        return res.status(400).json({ message: "Collection '" + name + "' was not found" });
    }
}