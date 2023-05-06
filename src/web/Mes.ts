import {ResData} from "../http/ResData";

type TypeT = 'success' | 'warning' | 'info' | 'error';

/** 消息处理器 */
export class Mes {
    /** 消息列表 */
    static msgList: {
        str: string;
        type: TypeT;
        rs: (() => void)[];
    }[] = [];

    /** 计时器 */
    static time;

    /**
     * 间隔时间
     * TODO 可重写
     */
    static intervalTime = 0;

    /**
     * 添加消息
     * @param {*} str
     * @param {*} type
     * @returns
     */
    static addMsg(str: string, type: TypeT) {
        return new Promise<void>((r, e) => {
            if (!str) {
                r();
                return;
            }
            let item = Mes.msgList.find(_ => _.type === type && _.str === str);
            if (item) {
                item.rs.push(r);
            } else {
                Mes.msgList.push({
                    str,
                    type,
                    rs: [r],
                });
            }
            //
            clearTimeout(Mes.time);
            Mes.time = setTimeout(() => {
                Mes.msgList.forEach(item => {
                    this[item.type + '_'](item.str);
                    item.rs.forEach(_ => {
                        _();
                    });
                });
                Mes.msgList.length = 0;
            }, this.intervalTime);
        });
    }

    /**
     * 是否提示
     */
    static ifMes = true;

    /**
     * 成功提示
     * @param str
     */
    static success(str: string) {
        Mes.ifMes && this.addMsg(str, 'success');
    }

    /**
     * 警告提示
     * @param str
     */
    static warning(str: string) {
        Mes.ifMes && this.addMsg(str, 'warning');
    }

    /**
     * info提示
     * @param str
     */
    static info(str: string) {
        Mes.ifMes && this.addMsg(str, 'info');
    }

    /**
     * 异常提示
     * @param str
     */
    static error(str: string) {
        Mes.ifMes && this.addMsg(str, 'error');
    }

    /** TODO 可重写 */
    static success_(str: string) {
        console.log('success:', str);
    }

    /** TODO 可重写 */
    static warning_(str: string) {
        console.log('warning:', str);
    }

    /** TODO 可重写 */
    static info_(str: string) {
        console.log('info:', str);
    }

    /** TODO 可重写 */
    static error_(str: string) {
        console.log('error:', str);
    }

    /**
     * 处理api请求的错误
     */
    static handleApiCatch(data: ResData) {
        console.error('api请求错误处理', data);
        try {
            Mes.ifMes && Mes.addMsg(data.msg, 'error');
        } catch {
            console.error(data);
        }
    }

    /**
     * 提示错误并继续抛出异常
     */
    static alertApiCatch(data: ResData) {
        Mes.handleApiCatch(data);
        throw data;
    }

    /**
     * 处理表单验证失败的错误
     * @param {*} e
     */
    static handleFormCatch(e) {
        console.warn('表单验证失败', e);
    }
}