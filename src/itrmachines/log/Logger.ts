import axios from 'axios';

export class Logger {
    private executor: string;
    private url: string;

    constructor(executor: string, url: string) {
        this.executor = executor;
        this.url = url;
    }

    public requestExecutionId(): Promise<any> {
        return new Promise((resolve, reject) => {
            axios.post(this.executor + "/generateid", {}, { headers: { 'Content-Type': 'application/json' }})
            .then(response => { resolve(response.data); })
            .catch(err => { reject(err); });
        });
    }

    public send(log: any): Promise<any> {
        return new Promise((resolve, reject) => {
            axios.post(this.url, { log: log }, { headers: { 'Content-Type': 'application/json' }})
            .then(response => { resolve(response.data); })
            .catch(err => { reject(err); });
        });
    }
}