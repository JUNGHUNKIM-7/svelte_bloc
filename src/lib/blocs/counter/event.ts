import BaseEvent from '../event';
import CounterState, { counterState } from './state';

export default abstract class CounterEvent extends BaseEvent {
	constructor() {
		super()
	}
}

export class IncrementEvent extends CounterEvent {
	update(): void {
		counterState.update((prev) => CounterState.copyWith('increment', prev.value + 1))
	}
	constructor() {
		super()
	}
}

export class DecrementEvent extends CounterEvent {
	update(): void {
		counterState.update((prev) => CounterState.copyWith('decrement', prev.value - 1))
	}
	constructor() {
		super()
	}
}