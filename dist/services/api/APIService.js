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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.APIService = exports.MGHToolsGlobal = void 0;
const mongoose_1 = require("mongoose");
const express_1 = __importDefault(require("express"));
const APIRequest_1 = require("./APIRequest");
const StatsManager_1 = require("./stats/StatsManager");
const StatsRequest_1 = require("./stats/StatsRequest");
var MGHToolsGlobal;
(function (MGHToolsGlobal) {
    MGHToolsGlobal.serviceSettings = { memory: {}, requests: {}, service: '' };
})(MGHToolsGlobal = exports.MGHToolsGlobal || (exports.MGHToolsGlobal = {}));
class APIService {
    constructor(config) {
        this.app = (0, express_1.default)();
        this.config = config;
        this.app.use(express_1.default.json());
        this.app.get('/', (req, res) => {
            return res.send('Server working!');
        });
        MGHToolsGlobal.serviceSettings = { memory: {}, requests: {}, service: config.service };
        this.addRequest(new StatsRequest_1.StatsRequest());
    }
    addRequest(request) {
        MGHToolsGlobal.serviceSettings.requests[request.type + "_" + request.path] = request;
        if (request.type === APIRequest_1.RequestType.GET)
            this.app.get(request.path, this.apply);
        else if (request.type === APIRequest_1.RequestType.POST)
            this.app.post(request.path, this.apply);
        else if (request.type === APIRequest_1.RequestType.PUT)
            this.app.put(request.path, this.apply);
        else if (request.type === APIRequest_1.RequestType.DELETE)
            this.app.delete(request.path, this.apply);
    }
    apply(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let request = MGHToolsGlobal.serviceSettings.requests[req.method + "_" + req.route.path];
            if (request) {
                yield StatsManager_1.statsManager.count(MGHToolsGlobal.serviceSettings.service, request.path);
                return yield request.apply(MGHToolsGlobal.serviceSettings.memory, req, res);
            }
            return res.status(400).json({ message: "Path route '" + req.path + "' in method '" + req.method + "' does not exists", req: req });
        });
    }
    run(init) {
        return new Promise((resolve, reject) => {
            this.app.listen(this.config.port, () => __awaiter(this, void 0, void 0, function* () {
                console.log(`⚡️[server]: Server is running at https://localhost:${this.config.port}`);
                console.log("> connecting to mongo database");
                yield (0, mongoose_1.connect)(this.config.database);
                console.log("> initializing stats");
                yield StatsManager_1.statsManager.init(this.config.service);
                yield init();
                resolve(undefined);
            }));
        });
    }
    update() {
        return __awaiter(this, void 0, void 0, function* () {
            yield StatsManager_1.statsManager.save();
        });
    }
}
exports.APIService = APIService;
//# sourceMappingURL=APIService.js.map