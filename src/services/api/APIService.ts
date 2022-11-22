import { connect } from 'mongoose';
import express, { Express, Request, Response } from 'express';
import { Service } from "../Service";
import { APIRequest, RequestType } from './APIRequest';
import { statsManager } from './stats/StatsManager';
import { StatsRequest } from './stats/StatsRequest';

export namespace MGHToolsGlobal {
    export var serviceSettings: any = { memory: {}, requests: {}, service: '' };
}

export class APIService implements Service {
    protected app: Express = express();
    protected port: string;
    protected service: string;
    protected database: string;

    constructor(service: string, port: string, database: string) {
        this.port = port;
        this.service = service;
        this.database = database;
        this.app.use(express.json());
        this.app.get('/', (req: Request, res: Response) => {
            return res.send('Server working!');
        });
        MGHToolsGlobal.serviceSettings = { memory: {}, requests: {}, service: service };
        this.addRequest(new StatsRequest());
    }

    public addRequest(request: APIRequest) {
        MGHToolsGlobal.serviceSettings.requests[request.path] = request;
        if (request.type == RequestType.GET)
            this.app.get(request.path, this.apply);
        else if (request.type == RequestType.POST)
            this.app.post(request.path, this.apply);
        else if (request.type == RequestType.PUT)
            this.app.put(request.path, this.apply);
    }

    public async apply(req: Request, res: Response) {
        let path: string = req.route.path;
        await statsManager.count(MGHToolsGlobal.serviceSettings.service, path);
        if (MGHToolsGlobal.serviceSettings.requests[path])
            return await MGHToolsGlobal.serviceSettings.requests[path].apply(MGHToolsGlobal.serviceSettings.memory, req, res);
        return res.status(400).json({ message: "Path route '" + path + "' does not exists" });
    }

    public run(init: Function): Promise<any> {
        return new Promise((resolve, reject) => {
            this.app.listen(this.port, async () => {
                console.log(`⚡️[server]: Server is running at https://localhost:${this.port}`);
                console.log("> connecting to mongo database");
                await connect(this.database);
                console.log("> initializing stats");
                await statsManager.init(this.service);
                await init();
                resolve(undefined);
            });
        });
    }

    public async update() {
        await statsManager.save();
    }
}