"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.statsManager = exports.StatsManager = void 0;
const ModelManager_1 = require("../../../mongoose/ModelManager");
class StatsManager extends ModelManager_1.ModelManager {
    constructor(collection) {
        super(collection, {
            service: { type: String, required: true },
            endpoint: { type: String, required: true },
            date: { type: Number, required: true },
            total: { type: Number, required: true },
        });
        this.stats = {};
        this.initialized = false;
    }
    findMany(service) {
        const _super = Object.create(null, {
            findMany: { get: () => super.findMany }
        });
        return __awaiter(this, void 0, void 0, function* () {
            return yield _super.findMany.call(this, { service: { $in: [service] } });
        });
    }
    updateMany(stats) {
        const _super = Object.create(null, {
            bulkWrite: { get: () => super.bulkWrite }
        });
        return __awaiter(this, void 0, void 0, function* () {
            let writes = [];
            for (let stat of stats) {
                writes.push({
                    updateOne: {
                        filter: {
                            service: stat.service,
                            endpoint: stat.endpoint,
                            date: stat.date
                        }, update: {
                            total: stat.total
                        }
                    }
                });
            }
            return yield _super.bulkWrite.call(this, writes);
        });
    }
    init(service) {
        return __awaiter(this, void 0, void 0, function* () {
            let stats = yield this.findMany(service);
            for (let stat of stats) {
                if (!this.stats[stat.endpoint])
                    this.stats[stat.endpoint] = {};
                this.stats[stat.endpoint][stat.date] = stat;
            }
            this.initialized = true;
        });
    }
    count(service, path) {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.initialized) {
                let date = new Date();
                let month = (10000 * date.getFullYear()) + (100 * (1 + date.getMonth())) + 1;
                if (!this.stats[path])
                    this.stats[path] = {};
                if (!this.stats[path][month]) {
                    this.stats[path][month] = {
                        service: service,
                        endpoint: path,
                        date: month,
                        total: 1
                    };
                    yield this.create(this.stats[path][month]);
                }
                else
                    this.stats[path][month].total++;
            }
        });
    }
    save() {
        return __awaiter(this, void 0, void 0, function* () {
            let date = new Date();
            let month = (10000 * date.getFullYear()) + (100 * (1 + date.getMonth())) + 1;
            let buffer = [];
            for (let path of Object.keys(this.stats))
                if (this.stats[path][month])
                    buffer.push(this.stats[path][month]);
            yield this.updateMany(buffer);
        });
    }
}
exports.StatsManager = StatsManager;
exports.statsManager = new StatsManager('service_stat');
//# sourceMappingURL=StatsManager.js.map