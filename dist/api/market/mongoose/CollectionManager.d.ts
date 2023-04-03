/// <reference types="mongoose/types/document" />
/// <reference types="mongoose/types/types" />
/// <reference types="mongoose/types/query" />
/// <reference types="mongoose/types/aggregate" />
/// <reference types="mongoose/types/callback" />
/// <reference types="mongoose/types/collection" />
/// <reference types="mongoose/types/connection" />
/// <reference types="mongoose/types/cursor" />
/// <reference types="mongoose/types/document" />
/// <reference types="mongoose/types/error" />
/// <reference types="mongoose/types/expressions" />
/// <reference types="mongoose/types/helpers" />
/// <reference types="mongoose/types/middlewares" />
/// <reference types="mongoose/types/indexes" />
/// <reference types="mongoose/types/models" />
/// <reference types="mongoose/types/mongooseoptions" />
/// <reference types="mongoose/types/pipelinestage" />
/// <reference types="mongoose/types/populate" />
/// <reference types="mongoose/types/query" />
/// <reference types="mongoose/types/schemaoptions" />
/// <reference types="mongoose/types/schematypes" />
/// <reference types="mongoose/types/session" />
/// <reference types="mongoose/types/types" />
/// <reference types="mongoose/types/utility" />
/// <reference types="mongoose/types/validation" />
/// <reference types="mongoose/types/virtuals" />
/// <reference types="mongoose" />
/// <reference types="mongoose/types/inferschematype" />
import { MongooseModelManager } from "itrm-tools";
export interface IContract {
    chain: string;
    address: string;
}
export interface ICollection {
    name: string;
    contracts: IContract[];
}
export declare class CollectionManager extends MongooseModelManager<ICollection> {
    constructor(collection: string);
    createByName(name: string): Promise<ICollection>;
    findByName(name: string): import("mongoose").Query<(import("mongoose").Document<unknown, any, ICollection> & Omit<ICollection & {
        _id: import("mongoose").Types.ObjectId;
    }, never>) | null, import("mongoose").Document<unknown, any, ICollection> & Omit<ICollection & {
        _id: import("mongoose").Types.ObjectId;
    }, never>, {}, ICollection>;
    deleteByName(name: string): any;
    update(collection: ICollection): any;
    countCollections(): Promise<number>;
}
