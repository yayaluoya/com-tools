/**
 * 来自vue源码
 */
import { isIE, isNative } from "./env";
let isUsingMicroTask = false;
/** 微任务执行队列 */
const callbacks = [];
/** 是否已经有任务了 */
let pending = false;
/** 执行所有注册的任务 */
function flushCallbacks() {
    pending = false;
    const copies = [...callbacks];
    callbacks.length = 0; //清空任务列表
    for (let i = 0; i < copies.length; i++) {
        copies[i]();
    }
}
/** 微任务执行器，在微任务中执行flushCallbacks方法 */
let timerFunc;
/**
 * 创建兼容性强的微任务执行器，并赋值给timerFunc
 */
/** 优先用promise来实现 */
if (typeof Promise !== 'undefined' && isNative(Promise)) {
    const p = Promise.resolve();
    timerFunc = () => {
        p.then(flushCallbacks);
    };
    isUsingMicroTask = true;
}
/** 其次用MutationObserver来实现，MutationObserver会在观察的元素发生更改时在微任务中执行注册的方法 */
else if (!isIE && typeof MutationObserver !== 'undefined' && (isNative(MutationObserver) ||
    MutationObserver.toString() === '[object MutationObserverConstructor]')) {
    let counter = 1;
    const observer = new MutationObserver(flushCallbacks);
    const textNode = document.createTextNode(String(counter));
    observer.observe(textNode, {
        characterData: true
    });
    timerFunc = () => {
        counter = (counter + 1) % 2;
        textNode.data = String(counter);
    };
    isUsingMicroTask = true;
}
/**
 * 再用setImmediate来实现，该方法用来把一些需要长时间运行的操作放在一个回调函数里，在浏览器完成后面的其他语句后，就立刻执行这个回调函数
 * 注意这个方法不是标准的方法，尽量不要使用
 */
else if (typeof window['setImmediate'] !== 'undefined' && isNative(window['setImmediate'])) {
    timerFunc = () => {
        window['setImmediate'](flushCallbacks);
    };
}
/** 最后用setTimeout方法来实现，这个方法是性能最差的，而且它添加的是个宏任务 */
else {
    // Fallback to setTimeout.
    timerFunc = () => {
        setTimeout(flushCallbacks, 0);
    };
}
/**
 * 创建一个微任务
 * @param {*} cb 执行方法
 * @param {*} ctx 执行域
 */
export function createMicroTasks(cb, ctx) {
    //推入任务到执行队列中
    let _resolve;
    callbacks.push(() => {
        //如果有回调函数就包装下，捕获异常
        if (cb) {
            try {
                cb.call(ctx);
            }
            catch (e) {
                console.error('微任务执行异常', e);
            }
        }
        //如果没有回调函数就解决返回的promice
        else if (_resolve) {
            _resolve(ctx);
        }
    });
    //先判断下是否已经在执行执行任务了，若果在执行就不调用了，保证一次宏任务只执行一次
    if (!pending) {
        pending = true;
        //执行执行队列中的任务
        timerFunc();
    }
    //如果没有传入回调方法，且有Promise则返回一个promise实例，在回调被执行时解决
    if (typeof Promise !== 'undefined') {
        return new Promise(resolve => {
            _resolve = resolve;
        });
    }
}
//# sourceMappingURL=createMicroTasks.js.map