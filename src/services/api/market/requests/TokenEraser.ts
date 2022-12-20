import { APIRequest, RequestType } from "../../APIRequest";

export class TokenEraser extends APIRequest {
    constructor() {
        super(RequestType.DELETE, '/collections/:name/tokens/:tokenId');
    }

    public async apply(memory: any, req: any, res: any): Promise<any> {
        const { name, tokenId } = req.params;
        let collection = await memory.market.collectionManager.find(name);
        if (collection) {
            if (!tokenId)
                return res.status(400).send({ err: "parameter 'tokenId' was not found" });
            await memory.market.tokenManager.deleteManyByTokenId(collection, tokenId);
            return res.status(200).json({ message: "Token '" + tokenId + "' was removed from collection'" + name + "'" });
        }
        return res.status(400).json({ message: "Collection '" + name + "' was not found" });
    }
}