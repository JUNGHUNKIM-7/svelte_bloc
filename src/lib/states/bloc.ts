import { writable } from 'svelte/store';
import CounterState from './state';
import type CounterEvent from './event';

export const counterState = writable<CounterState>(new CounterState('Initial', 0));

export default class Bloc {
    private static _instance: Bloc | undefined;
    private constructor(private _childrens: Children) {}

    static getInstance(children: Children): Bloc {
        this._instance = new Bloc(children);
        return this._instance;
    }

    private getChild<K extends Keys>(key: K): TChild<K> {
        return this._childrens[key] as TChild<K>;
    }

    set setCounterEvent(e: CounterEvent) {
        e.update();
    }
}

export const bloc = Bloc.getInstance({
    c: {},
    s: {},
    r: {}
});

interface Configs {
    c: {};
}

interface Repositories {
    r: {};
}

interface DataSources {
    s: {};
}

type Children = DataSources & Repositories & Configs;
type Keys = keyof Children;
type TChild<T extends Keys> = T extends 's'
    ? Children['s']
    : T extends 'r'
    ? Children['r']
    : T extends 'c'
    ? Children['c']
    : never;
