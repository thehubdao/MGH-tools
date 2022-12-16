import { IToken } from "../mongoose/TokenManager";
import { APIRequest, RequestType } from "../../APIRequest";

export class TokenCreator extends APIRequest {
    constructor() {
        super(RequestType.POST, '/collections/:name/tokens');
    }

    public async apply(memory: any, req: any, res: any): Promise<any> {
        const { name } = req.params;
        let collection = await memory.market.collectionManager.find(name);
        if (collection) {
            const { tokenIds } = req.body;
            if (!tokenIds)
                return res.status(400).send({ err: "property 'tokenIds' was not found in body" });
            let existance: any = {};
            for (let token of await memory.market.tokenManager.findManyByCollection(collection, tokenIds))
                existance[token.tokenId] = true;
            let tokens: IToken[] = [];
            for (let tokenId of tokenIds)
                if (!existance[tokenId])
                    tokens.push({
                        tokenId: tokenId,
                        chain: "ethereum",
                        collectionName: collection.name,
                        listings: [],
                        offers: []
                    });
            await memory.market.tokenManager.createMany(tokens);
            return res.status(200).json({ message: tokens.length + " new tokens where created for collection'" + name + "'" });
        }
        return res.status(400).json({ message: "Collection '" + name + "' was not found" });
    }
}