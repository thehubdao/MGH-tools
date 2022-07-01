"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.APIRequest = exports.RequestType = void 0;
var RequestType;
(function (RequestType) {
    RequestType[RequestType["GET"] = 0] = "GET";
    RequestType[RequestType["POST"] = 1] = "POST";
    RequestType[RequestType["PUT"] = 2] = "PUT";
})(RequestType = exports.RequestType || (exports.RequestType = {}));
class APIRequest {
    constructor(type, path) {
        this.type = type;
        this.path = path;
    }
}
exports.APIRequest = APIRequest;
//# sourceMappingURL=APIRequest.js.map