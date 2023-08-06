import { Cfg } from '$lib/utils/config';
import { Db } from '$lib/utils/db';
import { Ds } from '$lib/utils/ds';
import type { CounterEvent } from './counter/event';

export default class Bloc {
    static #instance?: Bloc;
    private constructor(private _childrens: Children) { }

    static getInstance(children: Children): Bloc {
        this.#instance = new Bloc(children);
        return this.#instance;
    }

    private getChild<K extends ChildrenKeys>(key: K): TChild<K> {
        return this._childrens[key] as TChild<K>;
    }

    private needInitialize<C extends { children?: Children }>(c: C, init: () => void) {
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
    c: {
        cfg: Cfg
    };
}

interface Repositories {
    r: {
        db: Db
    };
}

const children: Children = {
    c: {
        cfg: new Cfg()
    },
    r: {
        db: new Db(new Ds())
    }
}

export type Children = Repositories & Configs;
export type ChildrenKeys = keyof Children;
type TChild<T extends ChildrenKeys> = T extends 'r'
    ? Children['r']
    : T extends 'c'
    ? Children['c']
    : never;

export type ErrMessage = {
    [P in ChildrenKeys as `err_${P}`]: `${P}_is_undefined`
}

export const bloc = Bloc.getInstance(children)
