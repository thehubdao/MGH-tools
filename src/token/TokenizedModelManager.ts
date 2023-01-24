import { MongooseModelManager } from "itrm-tools";

export class TokenizedModelManager<S> extends MongooseModelManager<S> {
    constructor(collection: string, definition: any) {
        super(collection, definition);
    }

    public findByTokenId(tokenId: string) {
        return super.find({ tokenId: tokenId });
    }

    public findMany(tokenIds: string[]) {
        return super.findMany({ tokenId: { $in: tokenIds } });
    }

    public update(token: any) {
        return super.updateOne({ tokenId: token.tokenId }, token);
    }

    public async updateMany(tokens: any[], properties: string[]) {
        let writes: any[] = [];
        for (let token of tokens) {
            let datum: any = {};
            for (let property of properties)
                datum[property] = token[property];
            writes.push({
                updateOne: {
                    filter: { tokenId: token.tokenId },
                    update: datum
                }
            });
        }
        return await super.bulkWrite(writes);
    }

    public deleteByTokenId(tokenId: string) {
        return super.delete({ tokenId: tokenId });
    }

    public deleteManyTokens(tokens: any[]) {
        let writes: any[] = [];
        for (let token of tokens) {
            writes.push({
                deleteOne: {
                    filter: { tokenId: token.tokenId },
                }
            });
        }
        return super.bulkWrite(writes);
    }
}