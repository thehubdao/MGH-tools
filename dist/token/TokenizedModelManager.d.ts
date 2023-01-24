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
export declare class TokenizedModelManager<S> extends MongooseModelManager<S> {
    constructor(collection: string, definition: any);
    findByTokenId(tokenId: string): import("mongoose").Query<import("mongoose").HydratedDocument<S, {}, {}> | null, import("mongoose").HydratedDocument<S, {}, {}>, {}, S>;
    findMany(tokenIds: string[]): import("mongoose").Query<import("mongoose").HydratedDocument<S, {}, {}>[], import("mongoose").HydratedDocument<S, {}, {}>, {}, S>;
    update(token: any): import("mongoose").Query<import("mongodb").UpdateResult, import("mongoose").HydratedDocument<S, {}, {}>, {}, S>;
    updateMany(tokens: any[], properties: string[]): Promise<import("mongodb").BulkWriteResult>;
    deleteByTokenId(tokenId: string): import("mongoose").Query<import("mongodb").DeleteResult, import("mongoose").HydratedDocument<S, {}, {}>, {}, S>;
    deleteManyTokens(tokens: any[]): Promise<import("mongodb").BulkWriteResult>;
}
