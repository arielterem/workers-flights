export interface IFlight {
    workerId: number;
    num: string;
    from: string;
    to: string;
    from_date: string;
    to_date: string;
    plane: string;
    duration: number;   // min.
    from_gate: number;
    to_gate: number;
}
