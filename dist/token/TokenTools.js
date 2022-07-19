"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TokenTools = void 0;
class TokenTools {
    static getVariation(start, history) {
        if (history.length > 0) {
            let price = TokenTools.findOldestPrice(start, history);
            return (history[history.length - 1].price / price) - 1;
        }
        return 0;
    }
    static findOldestPrice(start, history) {
        for (let sale of history)
            if (sale.timestamp >= start)
                return sale.price;
        return history[history.length - 1].price;
    }
    static isValidTokenId(tokenId) {
        try {
            let value = parseInt(tokenId);
            return true;
        }
        catch (e) {
            return false;
        }
    }
}
exports.TokenTools = TokenTools;
//# sourceMappingURL=TokenTools.js.map