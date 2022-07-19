export class TokenTools {
    public static getVariation(start: number, history: any) {
        if (history.length > 0) {
            let price = TokenTools.findOldestPrice(start, history);
            return (history[history.length - 1].price / price) - 1;
        }
        return 0;
    }

    public static findOldestPrice(start: number, history: any) {
        for (let sale of history)
            if (sale.timestamp >= start)
                return sale.price;
        return history[history.length - 1].price;
    }

    public static isValidTokenId(tokenId: any) {
        try {
            let value = parseInt(tokenId);
            return true;
        } catch(e) {
            return false;
        }
    }
}