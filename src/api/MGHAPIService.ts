import { APIService, APIServiceConfig, APIServiceResponse, CheckableAPIRequest } from "itrm-tools"
import { StatsAPICheck } from "./stats/StatsAPICheck";
import { StatsManager } from "./stats/StatsManager";
import { StatsRequest } from "./stats/StatsRequest";
import { connect, disconnect } from 'mongoose';

export interface MGHServiceConfig extends APIServiceConfig {
    database: string,
    statsManager: StatsManager,
    delay?: number
}

export class MGHAPIService extends APIService {
    private statsCheck: StatsAPICheck;
    private statsManager: StatsManager;
    private database: string;
    private delay: number;
    
    constructor(config: MGHServiceConfig) {
        super(config);
        this.statsManager = config.statsManager;
        this.statsCheck = new StatsAPICheck(config.name, config.statsManager);
        this.database = config.database;
        this.delay = config.delay ?? 10 * 60 * 1000;
    }

    public getStatsManager() {
        return this.statsManager;
    }

    public init() {
        super.init();
        this.addRequest(new StatsRequest(this.statsManager, this.delay));
    }

    public addRequest(request: CheckableAPIRequest) {
        super.addRequest(request);
        request.addCheck(this.statsCheck);
    }

    public async run(init: Function): Promise<APIServiceResponse> {
        console.log("> Preparing database objects");
        await connect(this.database);
        await this.statsManager.init(this.name);
        console.log("> deploying service");
        return super.run(init);
    }

    public async close(finish: Function): Promise<APIServiceResponse> {
        await disconnect();
        return super.close(finish);
    }

    public async update() {
        await this.statsManager.save();
    }
}