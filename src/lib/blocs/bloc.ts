import { Cfg } from '$lib/utils/config';
import { Db } from '$lib/utils/db';
import { Ds } from '$lib/utils/ds';
import type { Children, ChildrenKeys, DataSources, TChild } from './types';
import type CounterEvent from './counter/event';

class Bloc {
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

const getChildren: (dataSources: DataSources) => Children = (dataSources: DataSources) => ({
    c: {
        cfg: new Cfg()
    },
    r: {
        db: new Db(dataSources.ds)
    }
})

export default Bloc.getInstance(getChildren({
    ds: new Ds()
}))