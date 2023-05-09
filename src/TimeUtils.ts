import moment from 'moment';

/**
 * 时间工具
 */
export class TimeUtils {
    static ONE_YEAR: number = 60 * 60 * 24 * 365;
    static ONE_DAY: number = 60 * 60 * 24;

    /**
     * 格式
     * TODO 可重写
     */
    static get format() {
        return 'YYYY-MM-DD HH:mm:ss';
    }

    /**
     * 获取时间
     * @param op
     * @returns
     */
    static getTime(op: moment.MomentInput) {
        return moment(op).format(this.format);
    }

    public static makeTimeLeftString(time: number, separator: string = ':', flag: Boolean = false): string {
        let second: number;
        let minute: number;
        let day: number;
        let ret: string = '';
        let hour: number;
        if (time <= 0) {
            ret = ret + '00:00';
            return ret;
        }
        if (time > this.ONE_YEAR) {
            ret = '大于一年';
            return ret;
        }
        if (flag) {
            if (time > this.ONE_DAY) {
                day = Math.floor(time / this.ONE_DAY);
                ret = day + '天';
            } else if (time >= 3600) {
                hour = Math.floor(time / 3600);
                ret = hour + '小时';
            } else {
                minute = Math.floor(time / 60);
                if (minute < 10) ret += '0';
                ret += minute.toString() + separator;
                second = time % 60;
                if (second < 10) ret += '0';
                ret += second.toString();
            }
            return ret;
        }
        if (time > this.ONE_DAY) {
            day = Math.floor(time / this.ONE_DAY);
            ret = day + '天';
            time = time - day * this.ONE_DAY;
            if (flag) {
                hour = Math.floor(time / 3600);
                if (hour > 0) {
                    ret += hour + '小时';
                }
                return ret;
            }
        }
        if (time <= 0) {
            ret = ret + '00:00';
            return ret;
        }
        ret = '';
        hour = Math.floor(time / 3600);
        if (hour > 0) {
            if (hour < 10) {
                ret += '0' + hour.toString() + separator;
            } else {
                ret += hour.toString() + separator;
            }
        }
        minute = Math.floor((time - hour * 3600) / 60);
        if (minute > 0 || hour > 0) {
            if (minute < 10) ret += '0';
            ret += minute.toString() + separator;
        } else {
            ret += '00' + separator;
        }
        second = time % 60;
        if (second < 10) ret += '0';
        ret += second.toString();
        return ret;
    }
}
