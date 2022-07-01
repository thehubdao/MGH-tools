import axios from 'axios';

export class ITRMConnection {
    private aiModule: string;
    private modelService: string;
    private domain: string;
    private apiKey: string;

    constructor(aiModule: string, modelService: string, domain: string, apiKey: string) {
        this.aiModule = aiModule;
        this.modelService = modelService;
        this.domain = domain;
        this.apiKey = apiKey;
    }

    public findProduct(name: string): Promise<any> {
        return new Promise((resolve, reject) => {
            let url = this.aiModule + "/products/myProductsAPI/?apiKey=" + this.apiKey;
            axios.get(url, { headers: {
                'Content-Type': 'application/json',
                'Origin': this.domain
            }}).then(response => {
                for (let network of response.data)
                    if (network.name === name)
                        resolve(network);
                resolve(undefined);
            }).catch(err => { reject(err); });
        });
    }

    public getDetails(product: any): Promise<any> {
        return new Promise((resolve, reject) => {
            let url = this.modelService + "/model/productAPI/" + product.productId + "/?apiKey=" + this.apiKey;
            axios.get(url, { headers: {
                'Content-Type': 'application/json',
                'Origin': this.domain
            }}).then(response => {
                resolve(response.data);
            }).catch(err => { reject(err); });
        });
    }

    public getUpdates(product: any): Promise<any> {
        return new Promise((resolve, reject) => {
            this.getDetails(product).then(details => {
                resolve(details.updates);
            }).catch(err => { reject(err); });
        });
    }

    public getDataset(product: any): Promise<any> {
        return new Promise((resolve, reject) => {
            this.getDetails(product).then(details => {
                resolve(details.data);
            }).catch(err => { reject(err); });
        });
    }

    public getHistoricalPredictions(update: any): Promise<any> {
        return new Promise((resolve, reject) => {
            let url = this.modelService + "/modelUpdate/predictionsBatchAPI/" + update.modelUpdateId + "/?apiKey=" + this.apiKey;
            axios.post(url, {}, { headers: {
                'Content-Type': 'application/json',
                'Origin': this.domain
            }}).then(response => {
                resolve(response.data.predictions);
            }).catch(err => { reject(err); });
        });
    }

    public getPrediction(update: any, input: any): Promise<any> {
        return new Promise((resolve, reject) => {
            let url = this.modelService + "/modelUpdate/predictionsAPI/" + update.modelUpdateId + "/?apiKey=" + this.apiKey;
            axios.post(url, { input: input }, { headers: {
                'Content-Type': 'application/json',
                'Origin': this.domain
            }}).then(response => {
                resolve(response);
            }).catch(err => { reject(err); });
        });
    }

    public getPredictionList(update: any, inputs: []): Promise<any> {
        return new Promise((resolve, reject) => {
            let url = this.modelService + "/modelUpdate/predictionListAPI/" + update.modelUpdateId + "/?apiKey=" + this.apiKey;
            axios.post(url, { inputs: inputs }, { headers: {
                'Content-Type': 'application/json',
                'Origin': this.domain
            }}).then(response => {
                resolve(response);
            }).catch(err => { reject(err); });
        });
    }
}