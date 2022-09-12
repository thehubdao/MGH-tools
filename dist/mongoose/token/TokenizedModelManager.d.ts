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
import { ModelManager } from "../ModelManager";
import { IToken } from "./TokenDefinitions";
export declare class TokenizedModelManager<S> extends ModelManager<S> {
    constructor(collection: string, definition: any);
    create(datum: IToken): Promise<import("mongoose").HydratedDocument<S, {}, unknown>>;
    createMany(data: IToken[]): Promise<import("mongodb").BulkWriteResult>;
    find(tokenId: string): Promise<import("mongoose").HydratedDocument<S, {}, {}> | null>;
    findMany(tokenIds: string[]): Promise<import("mongoose").HydratedDocument<S, {}, {}>[]>;
    update(token: any): Promise<import("mongodb").UpdateResult>;
    updateMany(tokens: any[], properties: string[]): Promise<void>;
    delete(tokenId: string): Promise<import("mongodb").DeleteResult>;
    deleteMany(tokens: any[]): Promise<void>;
}
