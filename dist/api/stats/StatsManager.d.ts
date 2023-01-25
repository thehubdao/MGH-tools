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
export interface IMonthlyStat {
    service: string;
    endpoint: string;
    date: number;
    total: number;
}
export declare class StatsManager extends MongooseModelManager<IMonthlyStat> {
    stats: any;
    constructor(collection: string);
    findManyByService(service: string): import("mongoose").Query<(import("mongoose").Document<unknown, any, IMonthlyStat> & IMonthlyStat & {
        _id: import("mongoose").Types.ObjectId;
    })[], import("mongoose").Document<unknown, any, IMonthlyStat> & IMonthlyStat & {
        _id: import("mongoose").Types.ObjectId;
    }, {}, IMonthlyStat>;
    updateMany(stats: any[]): Promise<import("mongodb").BulkWriteResult>;
    init(service: string): Promise<void>;
    count(service: string, path: string): Promise<void>;
    save(): Promise<import("mongodb").BulkWriteResult>;
}
