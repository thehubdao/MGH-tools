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
const express_1 = __importDefault(require("express"));
const APIRequest_1 = require("./APIRequest");
var MGHToolsGlobal;
(function (MGHToolsGlobal) {
    MGHToolsGlobal.serviceSettings = { memory: {}, requests: {} };
})(MGHToolsGlobal = exports.MGHToolsGlobal || (exports.MGHToolsGlobal = {}));
class APIService {
    constructor(port) {
        this.app = (0, express_1.default)();
        this.port = port;
        this.app.use(express_1.default.json());
        this.app.get('/', (req, res) => {
            return res.send('Server working!');
        });
        MGHToolsGlobal.serviceSettings = { memory: {}, requests: {} };
    }
    addRequest(request) {
        MGHToolsGlobal.serviceSettings.requests[request.path] = request;
        if (request.type == APIRequest_1.RequestType.GET)
            this.app.get(request.path, this.apply);
        else if (request.type == APIRequest_1.RequestType.POST)
            this.app.post(request.path, this.apply);
        else if (request.type == APIRequest_1.RequestType.PUT)
            this.app.put(request.path, this.apply);
    }
    apply(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let path = req.route.path;
            if (MGHToolsGlobal.serviceSettings.requests[path])
                return yield MGHToolsGlobal.serviceSettings.requests[path].apply(MGHToolsGlobal.serviceSettings.memory, req, res);
            return res.status(400).json({ message: "Path route '" + path + "' does not exists" });
        });
    }
    run(init) {
        return new Promise((resolve, reject) => {
            this.app.listen(this.port, () => {
                console.log(`⚡️[server]: Server is running at https://localhost:${this.port}`);
                init();
                resolve(undefined);
            });
        });
    }
}
exports.APIService = APIService;
//# sourceMappingURL=APIService.js.map