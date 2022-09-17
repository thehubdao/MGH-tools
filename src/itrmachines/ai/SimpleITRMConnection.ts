import { ITRMConnection } from "./ITRMConnection";

export class SimpleITRMConnection {
    private connection: ITRMConnection;

    constructor(connection: ITRMConnection) {
        this.connection = connection;
    }

    public getPrediction(update: any, input: any): Promise<any> {
        return new Promise((resolve, reject) => {
            this.connection.getPrediction(update, input).then(response => {
                resolve(response);
            }).catch(err => {
                console.log("> An error has ocurred:", err.message);
                resolve(undefined);
            });
        });
    }

    public getPredictionList(update: any, inputs: any[]): Promise<any> {
        return new Promise((resolve, reject) => {
            this.connection.getPredictionList(update, inputs).then(response => {
                resolve(response);
            }).catch(err => {
                console.log("> An error has ocurred in getPredictionList:", err.message);
                resolve(undefined);
            });
        });
    }

    public getUpdates(product: any): Promise<any> {
        return new Promise((resolve, reject) => {
            this.connection.getUpdates(product).then(response => {
                resolve(response);
            }).catch(err => {
                console.log("> An error has ocurred:", err.message);
                resolve(undefined);
            });
        });
    }

    public getHistoricalPredictions(update: any): Promise<any> {
        return new Promise((resolve, reject) => {
            this.connection.getHistoricalPredictions(update).then(response => {
                resolve(response);
            }).catch(err => {
                console.log("> An error has ocurred:", err.message);
                resolve(undefined);
            });
        });
    }

    public async requestProduct(name: string): Promise<any> {
        return new Promise((resolve, reject) => {
            console.log("> requesting product:", name);
            this.connection.findProduct(name).then(response => {
                resolve(response);
            }).catch(err => {
                console.log("> An error has ocurred:", err.message);
                resolve(undefined);
            });
        });
    }
}