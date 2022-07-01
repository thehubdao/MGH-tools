import { LoggerWebSocket } from "./LoggerWebSocket";

export class LoggerManager {
    private url: string;

    constructor(url: string) {
        this.url = url;
    }

    public connect(): Promise<LoggerWebSocket> {
        return new Promise((resolve, reject) => {
            let client = new LoggerWebSocket(this.url);
            client.on('open', () => {
                console.log("> client connected");
                resolve(client);
            });
            client.on('message', function(data: any) {
                let message = data.toString();
                let datum = JSON.parse(message);
                if (datum.action === 'LOG') {
                    delete datum.payload.log._id;
                    if (datum.payload.log.timestamp >= client.from)
                        client.transactions.push(datum.payload.log);
                } else if (datum.action === 'FINISHED') {
                    console.log("> finished");
                    client.resolve(client.transactions);
                } else if (datum.action === 'EMPTY_ID') {
                    console.log("> EMPTY_ID: ", datum.payload.message);
                    client.resolve([]);
                } else {
                    console.log("> unrecognizeable message: ", message);
                    client.resolve([]);
                }
            });
        });
    }

    public async requestNextLogs(client: LoggerWebSocket, executionId: string): Promise<any[]> {
        client.transactions = [];
        let logs: any[] = await new Promise((resolve, reject) => {
            client.resolve = resolve;
            client.reject = reject;
            console.log("> requesting:", executionId);
            client.send(executionId);
        });
        console.log("> logs:", logs.length);
        return logs;
    }
}