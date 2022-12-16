"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.APIRequest = exports.RequestType = void 0;
var RequestType;
(function (RequestType) {
    RequestType["GET"] = "GET";
    RequestType["POST"] = "POST";
    RequestType["PUT"] = "PUT";
    RequestType["DELETE"] = "DELETE";
})(RequestType = exports.RequestType || (exports.RequestType = {}));
class APIRequest {
    constructor(type, path) {
        this.type = type;
        this.path = path;
    }
}
exports.APIRequest = APIRequest;
//# sourceMappingURL=APIRequest.js.map