import { APIService, APIServiceConfig, APIServiceResponse, CheckableAPIRequest } from "itrm-tools"
import { StatsAPICheck } from "./stats/StatsAPICheck";
import { StatsManager } from "./stats/StatsManager";
import { StatsRequest } from "./stats/StatsRequest";
import { connect } from 'mongoose';

export interface MGHServiceConfig extends APIServiceConfig {
    database: string
}

export class MGHAPIService extends APIService {
    private statsCheck: StatsAPICheck;
    private database: string;
    private statsManager: StatsManager;
    
    constructor(config: MGHServiceConfig) {
        super(config);
        this.statsManager = new StatsManager('service_stat');
        this.statsCheck = new StatsAPICheck(config.name, this.statsManager);
        this.database = config.database;
    }

    public init() {
        super.init();
        this.addRequest(new StatsRequest(this.statsManager));
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

    public async update() {
        await this.statsManager.save();
    }
}