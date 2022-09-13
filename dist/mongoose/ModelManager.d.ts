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
/// <reference types="mongoose/types/inferschematype" />
import { Model } from "mongoose";
export declare class ModelManager<S> {
    collection: string;
    protected model: Model<S>;
    constructor(collection: string, definition: any);
    create(datum: S): Promise<import("mongoose").HydratedDocument<S, {}, unknown>>;
    createMany(data: S[]): Promise<import("mongodb").BulkWriteResult>;
    find(filter: any): Promise<import("mongoose").HydratedDocument<S, {}, {}> | null>;
    findMany(filter: any): Promise<import("mongoose").HydratedDocument<S, {}, {}>[]>;
    findAll(): Promise<any>;
    batch(from: number, size: number): Promise<import("mongoose").HydratedDocument<S, {}, {}>[]>;
    update(filter: any, data: any): Promise<import("mongodb").UpdateResult>;
    bulkWrite(writes: any[], options?: any): Promise<void>;
    delete(filter: any): Promise<import("mongodb").DeleteResult>;
}
