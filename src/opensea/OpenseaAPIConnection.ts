import axios from 'axios';
import { IContract } from '../api/market/mongoose/CollectionManager';
import { IToken } from '../api/market/mongoose/TokenManager';
import { waitFor } from '../token/TokenTools';

export interface OpenseaAPIConnectionConfig {
    waitingTime: number,
    coolingTime: number,
}

export class OpenseaAPIConnection {
    private apiKey: string;
    private config: OpenseaAPIConnectionConfig;

    constructor(apiKey: string, config: OpenseaAPIConnectionConfig) {
        this.apiKey = apiKey;
        this.config = config;
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
            waitFor(this.config.waitingTime);
            axios.get(url, { headers: {
                'Content-Type': 'application/json',
                'X-API-KEY': this.apiKey,
                "Accept-Encoding": "*"
            }}).then(response => {
                if (response && response.data && response.data.orders)
                    resolve(response.data.orders);
                else {
                    console.log("> no data was received");
                    waitFor(this.config.coolingTime);
                    resolve(undefined);
                }
            }).catch(err => {
                console.log("> an error has ocurred when requesting orders:", err?.response ? err.response : err);
                waitFor(this.config.coolingTime);
                resolve(undefined);
            });
        });
    }
}