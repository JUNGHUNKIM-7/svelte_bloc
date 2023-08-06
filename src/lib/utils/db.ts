export class Db {
    async runDb() {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve(1)
            }, 1000);
        })
    }
}