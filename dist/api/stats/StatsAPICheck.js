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
exports.StatsAPICheck = void 0;
class StatsAPICheck {
    constructor(service, statsManager) {
        this.service = service;
        this.statsManager = statsManager;
    }
    getConfig() {
        return {
            check: 'stats check'
        };
    }
    apply(config, req) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.statsManager.count(this.service, req.route.path);
                return { approved: true };
            }
            catch (err) {
                return {
                    approved: false,
                    rejection: {
                        code: 500,
                        payload: { message: config.check + " fail when counting", error: err }
                    }
                };
            }
        });
    }
}
exports.StatsAPICheck = StatsAPICheck;
//# sourceMappingURL=StatsAPICheck.js.map