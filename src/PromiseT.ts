/**
 * promise工具
 */
export class PromiseT {
    /**
     * 以函数的方式获取一个promise
     * @returns
     * @param executor
     */
    static getP<T = void>(
        executor: (resolve: (value: T | PromiseLike<T>) => void, reject: (reason?: any) => void) => void,
    ) {
        return new Promise(executor);
    }

    /**
     * 延时
     * @param t
     */
    static delay(t = 0) {
        return new Promise<void>((r) => {
            setTimeout(() => {
                r();
            }, t);
        });
    }
}
