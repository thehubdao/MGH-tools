import axios from 'axios';

export class OpenseaCollectionManager {
    private timestamp: number = 0;
    private collection: string;
    private apiKey: string;
    private data: any = { stats: { floor_price: 0 } };

    constructor(collection: string, apiKey: string) {
        this.collection = collection;
        this.apiKey = apiKey;
    }

    public async getData() {
        return this.data;
    }

    public async update() {
        let timestamp = (new Date()).getTime();
        if (timestamp - this.timestamp > 3600 * 1000) {
            this.timestamp = timestamp;
            await this.requestStats();
        }
    }

    private requestStats(): Promise<any> {
        return new Promise((resolve, reject) => {
            let url = "https://api.opensea.io/api/v1/collection/" + this.collection + "/stats";
            axios.get(url, { headers: {
                'Content-Type': 'application/json',
                'X-API-KEY': this.apiKey
            }}).then(response => {
                this.data = { ...this.data, ...response.data };
                resolve(response.data);
            }).catch(err => {
                console.log("> an error has ocurred when requesting collection stats:", err);
                reject(err);
            });
        });
    }
}