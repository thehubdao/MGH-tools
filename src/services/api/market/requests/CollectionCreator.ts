import { APIRequest, RequestType } from "../../APIRequest";

export class CollectionCreator extends APIRequest {
    constructor() {
        super(RequestType.POST, '/collections');
    }

    public async apply(memory: any, req: any, res: any): Promise<any> {
        let { name }  = req.body;
        if (name) {
            let collection = await memory.market.collectionManager.find(name);
            if (collection)
                return res.status(400).json({ message: "Collection '" + name + "' already exists" });
            await memory.market.collectionManager.createByName(name);
            return res.status(200).json({ message: "Collection '" + name + "' was created" });
        }
        return res.status(400).send({ err: "property 'name' was not found" });
    }
}