import moment from 'moment';

// Assumes date format is "YYYY-MM-DD"
export function showTodayYesterdayAndDayName(date) {
    const dateMoment = moment(date, "YYYY-MM-DD");
    const yesterday = moment().add(-1, 'days');

    if (dateMoment.diff(yesterday, 'days') === 1) {
        return "Yesterday"
    }
    else if (moment().diff(dateMoment, 'days') === 0) {
        return "Today"
    }
    else if (moment().diff(dateMoment, 'days') < 7) {
        return dateMoment.format("dddd");
    }
    else
        return dateMoment.format("YYYY-MM-DD");
}