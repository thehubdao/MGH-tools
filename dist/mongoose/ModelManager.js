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
exports.ModelManager = void 0;
const mongoose_1 = require("mongoose");
class ModelManager {
    constructor(collection, definition) {
        this.collection = collection;
        let schema = new mongoose_1.Schema(definition);
        this.model = (0, mongoose_1.model)(collection, schema);
    }
    create(datum) {
        return __awaiter(this, void 0, void 0, function* () {
            let token = yield new this.model(datum);
            yield token.save();
            return token;
        });
    }
    createMany(data) {
        return __awaiter(this, void 0, void 0, function* () {
            let writes = [];
            for (let datum of data) {
                writes.push({
                    insertOne: {
                        document: datum
                    }
                });
            }
            return yield this.model.bulkWrite(writes);
        });
    }
    find(filter) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.model.findOne(filter);
        });
    }
    findMany(filter) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.model.find(filter);
        });
    }
    findAll() {
        return __awaiter(this, void 0, void 0, function* () {
            let links = {}, data = [], step = 500, piv = 0;
            do {
                data = yield this.batch(piv, step);
                for (let link of data)
                    links[link.tokenId] = link;
                piv += 500;
            } while (data.length > 0);
            return links;
        });
    }
    batch(from, size) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.model.find().skip(from).limit(size);
        });
    }
    update(filter, data) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.model.updateOne(filter, data);
        });
    }
    bulkWrite(writes, options) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.model.bulkWrite(writes, options);
        });
    }
    delete(filter) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.model.deleteOne(filter);
        });
    }
    deleteMany(filter) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.model.deleteMany(filter);
        });
    }
    countDocuments(filter) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.model.countDocuments(filter);
        });
    }
}
exports.ModelManager = ModelManager;
//# sourceMappingURL=ModelManager.js.map