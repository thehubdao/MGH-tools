import { connect } from 'mongoose';
import express, { Express, Request, Response } from 'express';
import { Service } from "../Service";
import { APIRequest, RequestType } from './APIRequest';
import { statsManager } from './stats/StatsManager';
import { StatsRequest } from './stats/StatsRequest';

export namespace MGHToolsGlobal {
    export var serviceSettings: any = { memory: {}, requests: {}, service: '' };
}

export interface APIServiceConfig {
    service: string,
    port: string,
    database: string
}

export class APIService implements Service {
    protected app: Express = express();
    protected config: APIServiceConfig;

    constructor(config: APIServiceConfig) {
        this.config = config;
        this.app.use(express.json());
        this.app.get('/', (req: Request, res: Response) => {
            return res.send('Server working!');
        });
        MGHToolsGlobal.serviceSettings = { memory: {}, requests: {}, service: config.service };
        this.addRequest(new StatsRequest());
    }

    public addRequest(request: APIRequest) {
        MGHToolsGlobal.serviceSettings.requests[request.type + "_" + request.path] = request;
        if (request.type === RequestType.GET)
            this.app.get(request.path, this.apply);
        else if (request.type === RequestType.POST)
            this.app.post(request.path, this.apply);
        else if (request.type === RequestType.PUT)
            this.app.put(request.path, this.apply);
        else if (request.type === RequestType.DELETE)
            this.app.delete(request.path, this.apply);
    }

    public async apply(req: Request, res: Response) {
        let request = MGHToolsGlobal.serviceSettings.requests[req.method + "_" + req.route.path];
        if (request) {
            await statsManager.count(MGHToolsGlobal.serviceSettings.service, request.path);
            return await request.apply(MGHToolsGlobal.serviceSettings.memory, req, res);
        }
        return res.status(400).json({ message: "Path route '" + req.path + "' in method '" + req.method + "' does not exists", req: req });
    }

    public run(init: Function): Promise<any> {
        return new Promise((resolve, reject) => {
            this.app.listen(this.config.port, async () => {
                console.log(`⚡️[server]: Server is running at https://localhost:${this.config.port}`);
                console.log("> connecting to mongo database");
                await connect(this.config.database);
                console.log("> initializing stats");
                await statsManager.init(this.config.service);
                await init();
                resolve(undefined);
            });
        });
    }

    public async update() {
        await statsManager.save();
    }
}