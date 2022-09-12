import { ModelManager } from "../mongoose/ModelManager";
import { IToken } from "./TokenDefinitions";

export class TokenizedModelManager<S> extends ModelManager<S> {
    constructor(collection: string, definition: any) {
        super(collection, definition);
    }

    public async create(datum: IToken) {
        return await super.create(datum);
    }

    public async createMany(data: IToken[]) {
        return await super.createMany(data);
    }

    public async find(tokenId: string) {
        return await super.find({ tokenId: tokenId });
    }

    public async findMany(tokenIds: string[]) {
        return await super.findMany({ tokenId: { $in: tokenIds } });
    }

    public async update(token: any) {
        return await super.update({ tokenId: token.tokenId }, token);
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

    public async delete(tokenId: string) {
        return await super.delete({ tokenId: tokenId });
    }

    public async deleteMany(tokens: any[]) {
        let writes: any[] = [];
        for (let token of tokens) {
            writes.push({
                deleteOne: {
                    filter: { tokenId: token.tokenId },
                }
            });
        }
        return await super.bulkWrite(writes);
    }
}