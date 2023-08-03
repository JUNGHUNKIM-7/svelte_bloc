type CounterStatus = 'Initial' | 'Increment' | 'Decrement';

export default class CounterState {
    constructor(public status: CounterStatus, public value: number) {}

    static copyWith(status?: CounterStatus, value?: number): CounterState {
        return new CounterState(status ?? 'Initial', value ?? 0);
    }

    equals(other: CounterState) {
        if (this && this.status === other.status && this.value === other.value) {
            return true;
        }
        return false;
    }
}
