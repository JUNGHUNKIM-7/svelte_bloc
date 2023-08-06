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

    private getChild<K extends Keys>(key: K): TChild<K> {
        return this._childrens[key] as TChild<K>;
    }

    private needInitialize<C extends { children?: ExcludedDataSource }>(c: C, init: () => void) {
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

interface DataSources {
    s: {
        ds: Ds
    };
}

const children: Children = {
    c: {
        cfg: new Cfg()
    },
    s: {
        ds: new Ds()
    },
    r: {
        db: new Db()
    }
}

export type Children = DataSources & Repositories & Configs;
type Keys = keyof Children;
type TChild<T extends Keys> = T extends 's' ? Children['s']
    : T extends 'r' ? Children['r']
    : T extends 'c' ? Children['c']
    : never;

export type ExcludedDataSource = Omit<Children, 's'>
export type ExcludedDataSourceKey = keyof ExcludedDataSource
export type ErrMessage = {
    [P in ExcludedDataSourceKey as `err_${P}`]: `${P}_is_undefined`
}

export const bloc = Bloc.getInstance(children)