import { ICollection } from "../mongoose/CollectionManager";
import { APIRequest, RequestType } from "../../APIRequest";

export class CollectionRequest extends APIRequest {
    constructor() {
        super(RequestType.GET, '/collections');
    }

    public async apply(memory: any, req: any, res: any): Promise<any> {
        let { from, size } = req.query;
        if (from && size) {
            from = parseInt(from);
            size = parseInt(size);
            if (!isNaN(from) && !isNaN(size))
                return res.status(200).json({ collections: await this.getCollectionInfo(memory, await memory.market.collectionManager.batch(from, size)) });
            return res.status(400).send({ err: "parameters 'from' or 'size' are not valid, check your parameters" });
        }
        return res.status(400).send({ err: "no valid parameter" });
    }

    private async getCollectionInfo(memory: any, collections: ICollection[]) {
        let result: any = [];
        for (let collection of collections)
            result.push({
                name: collection.name,
                tokens: await memory.market.tokenManager.countTokens(collection)
            });
        return result;
    }
}