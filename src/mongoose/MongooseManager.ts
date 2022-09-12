import { connect } from 'mongoose';

export class MongooseManager {
    private url: string;
    public managers: any = {};

    constructor(mongoUrl: string, database: string) {
        this.url = mongoUrl + "/" + database;
    }

    public async connect() {
        await connect(this.url);
    }
}