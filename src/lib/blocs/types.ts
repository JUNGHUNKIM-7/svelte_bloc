import type { Cfg } from "$lib/utils/config";
import type { Db } from "$lib/utils/db";
import type { Ds } from "$lib/utils/ds";

export interface Configs {
    c: {
        cfg: Cfg
    };
}

export interface Repositories {
    r: {
        db: Db
    };
}

export interface DataSources {
    ds: Ds
}

export type Children = Repositories & Configs;
export type ChildrenKeys = keyof Children;
export type TChild<T extends ChildrenKeys> = T extends 'r'
    ? Children['r']
    : T extends 'c'
    ? Children['c']
    : never;

export type ErrMessage = {
    [P in ChildrenKeys as `err_${P}`]: `${P}_is_undefined`
}
