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
exports.MGHAPIService = void 0;
const itrm_tools_1 = require("itrm-tools");
const StatsAPICheck_1 = require("./stats/StatsAPICheck");
const StatsRequest_1 = require("./stats/StatsRequest");
const mongoose_1 = require("mongoose");
class MGHAPIService extends itrm_tools_1.APIService {
    constructor(config) {
        var _a;
        super(config);
        this.statsManager = config.statsManager;
        this.statsCheck = new StatsAPICheck_1.StatsAPICheck(config.name, config.statsManager);
        this.database = config.database;
        this.delay = (_a = config.delay) !== null && _a !== void 0 ? _a : 10 * 60 * 1000;
    }
    getStatsManager() {
        return this.statsManager;
    }
    init() {
        super.init();
        this.addRequest(new StatsRequest_1.StatsRequest(this.statsManager, this.delay));
    }
    addRequest(request) {
        super.addRequest(request);
        request.addCheck(this.statsCheck);
    }
    run(init) {
        const _super = Object.create(null, {
            run: { get: () => super.run }
        });
        return __awaiter(this, void 0, void 0, function* () {
            console.log("> Preparing database objects");
            yield (0, mongoose_1.connect)(this.database);
            yield this.statsManager.init(this.name);
            console.log("> deploying service");
            return _super.run.call(this, init);
        });
    }
    close(finish) {
        const _super = Object.create(null, {
            close: { get: () => super.close }
        });
        return __awaiter(this, void 0, void 0, function* () {
            yield (0, mongoose_1.disconnect)();
            return _super.close.call(this, finish);
        });
    }
    update() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.statsManager.save();
        });
    }
}
exports.MGHAPIService = MGHAPIService;
//# sourceMappingURL=MGHAPIService.js.map