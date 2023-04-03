import { MGHAPIService, MGHServiceConfig, StatsManager } from "../../dist";
import { MongoMemoryServer } from 'mongodb-memory-server';
import { CheckableGetRequest, ExpressStandardConfiguration } from "itrm-tools";
import mongoose from "mongoose";
import { requestGet } from "../Definitions";
import { Request, Response } from "express";

mongoose.set('strictQuery', false);

class TestRequest extends CheckableGetRequest {
    constructor() {
        super({
            path: "/test",
            params: []
        });
    }

    public async apply(req: Request, res: Response): Promise<any> {
        return await res.status(200).json({});
    }
}

describe("Testing MGH API Service", () => {
    let mongodb: MongoMemoryServer;
    let service: MGHAPIService;
    let config: MGHServiceConfig;

    beforeAll(async() => {
        mongodb  = await MongoMemoryServer.create();
        let url = await mongodb?.getUri() || "NONE";
        config = {
            name: "test",
            port: 8101,
            database: url,
            express: new ExpressStandardConfiguration(),
            delay: 0,
            statsManager: new StatsManager('test')
        };
        service = new MGHAPIService(config);
        service.init();
        service.addRequest(new TestRequest());
        await service.run(() => {});
    });
    afterAll(async() => {
        await service.close(() => {});
        await mongodb?.stop();
    });
    test('Server working!', async() => {
        expect.assertions(1);
        return requestGet("http://localhost:" + config.port).then(response => {
            expect(response).toMatch("Server working!");
        });
    });
    test('Test Stats', async() => {
        expect.assertions(3);
        return requestGet("http://localhost:" + config.port + "/stats")
        .then((response: any) => {
            expect(response['/stats']).toBeDefined();
            expect(response['/stats'].current_month_calls).toBe(1);
            expect(response['/test']).toBeUndefined();
        });
    });
    test('Check /test route', async() => {
        await requestGet("http://localhost:" + config.port + "/test");
        expect.assertions(4);
        return requestGet("http://localhost:" + config.port + "/stats")
        .then((response: any) => {
            expect(response['/stats']).toBeDefined();
            expect(response['/stats'].current_month_calls).toBe(2);
            expect(response['/test']).toBeDefined();
            expect(response['/test'].current_month_calls).toBe(1);
        });
    });
    test('Check Stored data', async() => {
        await service.update();
        let data = await service.getStatsManager().findManyByService('test');
        expect(data.length).toBe(2);
        expect(data[0].endpoint).toMatch("/stats");
        expect(data[0].total).toBe(2);
        expect(data[1].endpoint).toMatch("/test");
        expect(data[1].total).toBe(1);
    });
});