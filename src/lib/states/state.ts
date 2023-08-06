import { writable } from "svelte/store";

export type CounterStatus = "initial" | 'increment' | 'decrement'

export default class CounterState {
    constructor(public status: CounterStatus, public value: number) { }

    static copyWith(status?: CounterStatus, value?: number): CounterState {
        return new CounterState(
            status ?? "initial",
            value ?? 0
        )
    }

    equals(other: CounterState): boolean {
        return true
    }
}

export const counterState = writable<CounterState>(new CounterState("initial", 0))