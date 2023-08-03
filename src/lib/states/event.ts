import { counterState } from './bloc';
import CounterState from './state';

export default class CounterEvent {
    update() {}
}

export class IncrementEvent implements CounterEvent {
    update() {
        counterState.update((prev) => CounterState.copyWith('Increment', prev.value + 1));
    }
}

export class DecrementEvent implements CounterEvent {
    update() {
        counterState.update((prev) => CounterState.copyWith('Decrement', prev.value - 1));
    }
}
