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

    public static makeTimeLeftString(
        time: number,
        separator: string = ':',
        flag: Boolean = false,
    ): string {
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

    /**
     * 获取当前月的日历
     * @param mTime 带当前月份的时间
     * @returns
     */
    static getMonthCalendar(mTime: moment.MomentInput = moment()) {
        let list: {
            /** 数据 */
            time: moment.Moment;
            /** 月类型 上月 当月 下月 */
            mType: 'up' | 'on' | 'next';
            /** 是否是今天 */
            today: boolean;
        }[][] = [[]];
        let onD = moment();
        let onMoment = moment(mTime, 'YYYY-MM');
        onMoment.date(1);
        let upMoment = onMoment.clone();
        // 补全上一个月的
        for (let i = upMoment.day() || 7; i > 1; i--) {
            upMoment.add(-1, 'd');
            list[list.length - 1].unshift({
                time: upMoment.clone(),
                mType: 'up',
                today: onD.isSame(upMoment, 'D'),
            });
        }
        // 补全本月
        let onM = onMoment.month();
        while (onM == onMoment.month()) {
            if (list[list.length - 1].length >= 7) {
                list.push([]);
            }
            list[list.length - 1].push({
                time: onMoment.clone(),
                mType: 'on',
                today: onD.isSame(onMoment, 'D'),
            });
            onMoment.add(1, 'd');
        }
        // 补全下一个月
        let nextMoment = onMoment.clone();
        if ((nextMoment.day() || 7) > 1) {
            for (let i = nextMoment.day() || 7; i <= 7; i++) {
                list[list.length - 1].push({
                    time: nextMoment.clone(),
                    mType: 'next',
                    today: onD.isSame(nextMoment, 'D'),
                });
                nextMoment.add(1, 'd');
            }
        }
        return list;
    }

    /**
     * 获取某一周的日历
     * @param time 目标时间
     * @returns
     */
    static getWeekCalendar(time: moment.MomentInput = moment()) {
        return TimeUtils.getMonthCalendar(time)
            .find((_) => _.some((__) => moment(time).isSame(__.time)))
            .map((_) => {
                return {
                    time: _.time,
                    today: _.today,
                };
            });
    }
}
