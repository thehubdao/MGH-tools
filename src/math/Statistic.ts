export interface Statistic<P, O> {
    apply(predictions: P, values: P): O;
}