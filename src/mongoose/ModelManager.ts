import { Model, model, Schema } from "mongoose";

export class ModelManager<S> {
    public collection: string;
    protected model: Model<S>;

    constructor(collection: string, definition: any) {
        this.collection = collection;
        let schema = new Schema<S>(definition);
        this.model = model<S>(collection, schema);
    }

    public async create(datum: S) {
        let token = await new this.model(datum);
        await token.save();
        return token;
    }

    public async createMany(data: S[]) {
        let writes: any[] = [];
        for (let datum of data) {
            writes.push({
                insertOne: {
                    document: datum
                }
            });
        }
        return await this.model.bulkWrite(writes);
    }

    public async find(filter: any) {
        return await this.model.findOne(filter);
    }

    public async findMany(filter: any) {
        return await this.model.find(filter);
    }

    public async findAll() {
        let links: any = {}, data: any[] = [], step = 500, piv = 0;
        do {
            data = await this.batch(piv, step);
            for (let link of data)
                links[link.tokenId] = link;
            piv += 500;
        } while(data.length > 0);
        return links;
    }

    public async batch(from: number, size: number) {
        return await this.model.find().skip(from).limit(size);
    }

    public async update(filter: any, data: any) {
        return await this.model.updateOne(filter, data);
    }
    
    public async bulkWrite(writes: any[], options?: any) {
        return await this.model.bulkWrite(writes, options);
    }

    public async delete(filter: any) {
        return await this.model.deleteOne(filter);
    }

    public async deleteMany(filter: any) {
        await this.model.deleteMany(filter);
    }

    public async countDocuments(filter: any) {
        return await this.model.countDocuments(filter);
    }
}