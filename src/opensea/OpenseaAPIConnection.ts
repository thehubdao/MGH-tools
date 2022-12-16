import axios from 'axios';
import { IContract } from '../services/api/market/mongoose/CollectionManager';
import { IToken } from '../services/api/market/mongoose/TokenManager';
import { waitFor } from '../token/TokenTools';

export class OpenseaAPIConnection {
    private apiKey: string;

    constructor(apiKey: string) {
        this.apiKey = apiKey;
    }

    public async requestOrders(type: string, contract: IContract, tokens: IToken[]) {
        let url = `https://api.opensea.io/v2/orders/${contract.chain}/seaport/${type}?asset_contract_address=${contract.address}${this.buildTokensSuffix(tokens)}`;
        for (let attemp = 1; attemp < 10; attemp++) {
            let response = await this.request(url);
            if (response)
                return response;
        }
        return [];
    }

    private buildTokensSuffix(tokens: IToken[]) {
        let result = "";
        for (let token of tokens)
            result += "&token_ids=" + token.tokenId;
        return result;
    }

    private request(url: string) {
        return new Promise<any>(async (resolve, reject) => {
            waitFor(100);
            axios.get(url, { headers: {
                'Content-Type': 'application/json',
                'X-API-KEY': this.apiKey,
                "Accept-Encoding": "*"
            }}).then(response => {
                resolve(response.data?.orders);
            }).catch(err => {
                console.log("> an error has ocurred when requesting orders:", err.response);
                waitFor(3000);
                resolve(undefined);
            });
        });
    }
}