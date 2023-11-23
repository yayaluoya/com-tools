import { TimeUtils } from 'yayaluoya-tool/TimeUtils';

let calender = TimeUtils.getMonthCalendar();

calender.forEach((_) =>
    _.forEach((_) => {
        _.format = _.time.format('YYYY-MM-DD');
    }),
);

let wC = TimeUtils.getWeekCalendar();
console.log('月日历', calender);

wC.forEach((_) => {
    _.format = _.time.format('YYYY-MM-DD');
});
console.log('周日历', wC);
