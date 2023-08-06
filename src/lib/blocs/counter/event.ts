import type { ExcludedDataSource, Children, ExcludedDataSourceKey, ErrMessage } from "../bloc"
import CounterState, { counterState } from "./state"

export abstract class CounterEvent {
	abstract update(): void

	#children?: ExcludedDataSource

	init(c: Children): void {
		this.#children = c
		if (this.#children === undefined) {
			throw new Error("CounterEvent's children are still undefined")
		}
	}

	private getChild<T extends ExcludedDataSourceKey>(
		k: T,
		err: T extends 'r' ? ErrMessage['err_r'] : ErrMessage['err_c']
	): ExcludedDataSource[T] {
		if (this.#children === undefined) {
			throw new Error(err)
		}
		return this.#children[k]
	}

	get getCfg() {
		return this.getChild('c', "c_is_undefined").cfg
	}

	get getDb() {
		return this.getChild('r', "r_is_undefined").db
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