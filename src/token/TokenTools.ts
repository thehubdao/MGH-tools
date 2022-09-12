export function getVariation(start: number, history: any) {
    if (history.length > 0) {
        let price = findOldestPrice(start, history);
        return (history[history.length - 1].price / price) - 1;
    }
    return 0;
}

export function findOldestPrice(start: number, history: any) {
    for (let sale of history)
        if (sale.timestamp >= start)
            return sale.price;
    return history[history.length - 1].price;
}

export function isValidTokenId(tokenId: any) {
    try {
        let value = parseInt(tokenId);
        return true;
    } catch(e) {
        return false;
    }
}

export function waitFor(millis: number) {
    let start = (new Date()).getTime();
    let currentTime = start;
    while (Math.abs(currentTime - start) < millis) currentTime = (new Date()).getTime();
}