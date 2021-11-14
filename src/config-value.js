"use strict";
exports.__esModule = true;
function getDayHolidayFromObject(incomeObject) {
    var arrayDayHoliday = [];
    var dataHolidays = Object.values(incomeObject);
    for (var i = 0; i < dataHolidays.length; i++) {
        arrayDayHoliday.push(dataHolidays[i].day);
    }
    return {
        arrayDayHoliday: arrayDayHoliday
    };
}
exports.getDayHolidayFromObject = getDayHolidayFromObject;
function getMonthHolidayFromObject(incomeObject) {
    var arrayMonthHoliday = [];
    var dataHolidays = Object.values(incomeObject);
    for (var i = 0; i < dataHolidays.length; i++) {
        arrayMonthHoliday.push(dataHolidays[i].month - 1);
    }
    return {
        arrayMonthHoliday: arrayMonthHoliday
    };
}
exports.getMonthHolidayFromObject = getMonthHolidayFromObject;
