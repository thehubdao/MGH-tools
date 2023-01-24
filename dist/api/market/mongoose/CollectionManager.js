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
exports.CollectionManager = void 0;
const itrm_tools_1 = require("itrm-tools");
class CollectionManager extends itrm_tools_1.MongooseModelManager {
    constructor(collection) {
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
    createByName(name) {
        const _super = Object.create(null, {
            create: { get: () => super.create }
        });
        return __awaiter(this, void 0, void 0, function* () {
            return _super.create.call(this, {
                name: name,
                contracts: []
            });
        });
    }
    findByName(name) {
        return super.find({ name: name });
    }
    deleteByName(name) {
        return super.delete({ name: name });
    }
    update(collection) {
        return super.updateOne({ name: collection.name }, collection);
    }
    countCollections() {
        const _super = Object.create(null, {
            countDocuments: { get: () => super.countDocuments }
        });
        return __awaiter(this, void 0, void 0, function* () {
            return yield _super.countDocuments.call(this, {});
        });
    }
}
exports.CollectionManager = CollectionManager;
//# sourceMappingURL=CollectionManager.js.map