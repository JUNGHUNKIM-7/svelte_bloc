import type { Ds } from './ds';

export class Db {
    constructor(private ds: Ds) {}

    async runDb() {
        this.ds.runDs()
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve(1);
            }, 1000);
        });
    }
}
