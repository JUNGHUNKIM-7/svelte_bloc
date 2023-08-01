import { writable } from 'svelte/store';
import CounterState, { CounterStatus } from './state';
import type CounterEvent from './event';

export const counterState = writable<CounterState>(
	new CounterState(CounterStatus.Initial, 0),
);

enum Repositories {}

export default class Bloc {
	private constructor() {}
	private static _instance: Bloc;
	private static _childrens: unknown[];

	private static getChild<T>(repositories: Repositories): T {
		return this._childrens[repositories] as T;
	}

	static getInstance(children: unknown[]): Bloc {
		this._instance = new Bloc();
		this._childrens = children;
		return this._instance;
	}

	set counterEventSink(e: CounterEvent) {
		e.update();
	}
}

export const bloc = Bloc.getInstance([]);
