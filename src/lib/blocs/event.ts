import type { Children, ChildrenKeys, ErrMessage } from "./types"

export default abstract class BaseEvent {
	abstract update(): void

	children?: Children

	init(c: Children): void {
		this.children = c
		if (this.children === undefined) {
			throw new Error("CounterEvent's children are still undefined")
		}
	}

	private getChild<K extends ChildrenKeys>(
		k: K,
		err: K extends 'r' ? ErrMessage['err_r'] : ErrMessage['err_c']
	): Children[K] {
		if (this.children === undefined) {
			throw new Error(err)
		}
		return this.children[k]
	}

	get getCfg() {
		return this.getChild('c', "c_is_undefined").cfg
	}

	get getDb() {
		return this.getChild('r', "r_is_undefined").db
	}
}