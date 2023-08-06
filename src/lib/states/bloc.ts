import type { CounterEvent } from "./event";

export default class Bloc {
	private static _instance?: Bloc;
	private constructor(private _childrens: Children) { }

	static getInstance(children: Children): Bloc {
		this._instance = new Bloc(children);
		return this._instance;
	}

	private getChild<K extends Keys>(key: K): TChild<K> {
		return this._childrens[key] as TChild<K>;
	}

	private needInitialize<C extends { children?: Omit<Children, 's'> }>(c: C, init: () => void) {
		if (c.children === undefined) {
			init();
		}
	}

	set setCounterEvent(e: CounterEvent) {
		this.needInitialize(e, () => e.init(this._childrens))
		e.update()
	}
}

interface Configs {
	c: {};
}

interface Repositories {
	r: {};
}

interface DataSources {
	s: {};
}

const children: Children = {
	c: {},
	s: {},
	r: {}
}

export type Children = DataSources & Repositories & Configs;
type Keys = keyof Children;
type TChild<T extends Keys> = T extends 's' ? Children['s']
	: T extends 'r' ? Children['r']
	: T extends 'c' ? Children['c']
	: never;

export const bloc = Bloc.getInstance(children)
