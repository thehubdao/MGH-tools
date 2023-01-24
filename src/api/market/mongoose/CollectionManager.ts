import { MongooseModelManager } from "itrm-tools";

export interface IContract {
    chain: string,
    address: string
}

export interface ICollection {
    name: string,
    contracts: IContract[]
}

export class CollectionManager extends MongooseModelManager<ICollection> {
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

    public findByName(name: string) {
        return super.find({ name: name });
    }

    public deleteByName(name: string) {
        return super.delete({ name: name });
    }

    public update(collection: ICollection) {
        return super.updateOne({ name: collection.name }, collection);
    }

    public async countCollections() {
        return await super.countDocuments({});
    }
}