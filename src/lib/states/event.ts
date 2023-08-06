import type { Children } from "./bloc";
import CounterState, { counterState } from "./state";

export abstract class CounterEvent {
	children?: Omit<Children, 's'>

	init(c: Children): void {
		this.children = c
		if (this.children === undefined) {
			throw new Error("CounterEvent's children are still undefined")
		}
	}

	abstract update(): void
}

export class IncrementEvent extends CounterEvent {
	constructor() {
		super()
	}

	update() {
		counterState.update((prev) => CounterState.copyWith('increment', prev.value + 1));
	}
}

export class DecrementEvent extends CounterEvent {
	constructor() {
		super()
	}

	update() {
		counterState.update((prev) => CounterState.copyWith('decrement', prev.value - 1));
	}
}