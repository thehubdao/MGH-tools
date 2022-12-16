import { ModelManager } from "../../../../mongoose/ModelManager";

export interface IContract {
    chain: string,
    address: string
}

export interface ICollection {
    name: string,
    contracts: IContract[]
}

export class CollectionManager extends ModelManager<ICollection> {
    constructor(collection: string) {
        super(collection, {
            name: { type: String, required: true },
            contracts: {
                type: [{
                    chain: { type: String, required: true },
                    address: { type: String, required: true }
                }],
                required: true
            }
        });
    }

    public async createByName(name: string) {
        return super.create({
            name: name,
            contracts: []
        });
    }

    public async find(name: string) {
        return await super.find({ name: name });
    }

    public async delete(name: string) {
        return await super.delete({ name: name });
    }

    public async update(collection: ICollection) {
        return await super.update({ name: collection.name }, collection);
    }

    public async countCollections() {
        return await super.countDocuments({});
    }
}