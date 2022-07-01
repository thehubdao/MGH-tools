import { ClientRequestArgs } from 'http';
import WebSocket from 'ws';

export class LoggerWebSocket extends WebSocket {
    public from: number = 0;
    public transactions: any[] = [];
    public resolve: any;
    public reject: any;

    constructor(address: string, options?: WebSocket.ClientOptions | ClientRequestArgs | undefined) {
        super(address, options);
    }
}