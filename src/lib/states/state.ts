export enum CounterStatus {
	Initial,
	Increment,
	Decrement,
}

export default class CounterState {
	constructor(public status: CounterStatus, public value: number) {}

	static copyWith(status?: CounterStatus, value?: number): CounterState {
		return new CounterState(
			status ?? CounterStatus.Initial,
			value ?? 0,
		);
	}
}
