"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.waitFor = exports.isValidTokenId = exports.findOldestPrice = exports.getVariation = void 0;
function getVariation(start, history) {
    if (history.length > 0) {
        let price = findOldestPrice(start, history);
        return (history[history.length - 1].price / price) - 1;
    }
    return 0;
}
exports.getVariation = getVariation;
function findOldestPrice(start, history) {
    for (let sale of history)
        if (sale.timestamp >= start)
            return sale.price;
    return history[history.length - 1].price;
}
exports.findOldestPrice = findOldestPrice;
function isValidTokenId(tokenId) {
    try {
        let value = parseInt(tokenId);
        return true;
    }
    catch (e) {
        return false;
    }
}
exports.isValidTokenId = isValidTokenId;
function waitFor(millis) {
    let start = (new Date()).getTime();
    let currentTime = start;
    while (Math.abs(currentTime - start) < millis)
        currentTime = (new Date()).getTime();
}
exports.waitFor = waitFor;
//# sourceMappingURL=TokenTools.js.map