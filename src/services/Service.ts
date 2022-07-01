export interface Service {
    run(init: Function): Promise<any>;
}