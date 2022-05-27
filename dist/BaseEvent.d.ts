/**
 * 事件基类
 * 继承此类就可以成为事件调度者了
 */
export declare class BaseEvent<E extends string | symbol = string | symbol> {
    /** 事件执行列表 */
    private eventList;
    /** 延迟触发事件列表 */
    private _eventList;
    /**
     * 监听事件
     * @param key 唯一key
     */
    on(key: E, _this: any, f: Function): void;
    /**
     * 监听一次事件
     * @param key 唯一key
     */
    onOnce(key: E, _this: any, f: Function): void;
    /**
     * 取消监听
     * 这些参数可以不传，传了就表示要对该参数做判断
     * @param key
     * @param _this
     * @param f
     */
    off(key?: E, _this?: any, f?: Function): void;
    /**
     * 触发事件
     * @param key 唯一key
     * @param arg 需要传递的参数
     */
    emit(key: E, ...arg: any[]): void;
    /** 延迟触发 */
    deferEmit(key: E, ...arg: any[]): void;
    /** 执行延迟触发 */
    exeDeferEmit(): void;
    /** 清理延迟触发事件 */
    clearDeferEmit(): void;
}
