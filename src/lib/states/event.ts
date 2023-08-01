import { counterState } from './bloc';
import CounterState, { CounterStatus } from './state';

export default class CounterEvent {
	update() {}
}

export class IncrementEvent implements CounterEvent {
	update() {
		counterState.update((prev) =>
			CounterState.copyWith(CounterStatus.Increment, prev.value + 1)
		);
	}
}

export class DecrementEvent implements CounterEvent {
	update() {
		counterState.update((prev) =>
			CounterState.copyWith(CounterStatus.Decrement, prev.value - 1)
		);
	}
}
