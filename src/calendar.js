"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
exports.__esModule = true;
var weather_1 = require("./weather");
var config = require("./config.json");
var config_value_1 = require("./config-value");
var todo_1 = require("./todo");
var date = new Date();
var currentMonth = date.getMonth();
var currentYear = date.getFullYear();
var firstDayOfMonth;
var lastDateOfMonth;
var lastDayOfLastMonth;
var isWearherChecked = false;
var currentDay = date.getDate();
var startDayOffValue = 'Sat-Sun';
var daysOfWeekWithSunday = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
var indexOfFirstDayCalendar = 0;
var TDTransparent = '<td class="days__not-current">';
var arrayDayOff = [6, 0];
var Grid = /** @class */ (function () {
    function Grid() {
    }
    return Grid;
}());
var Calendar = /** @class */ (function (_super) {
    __extends(Calendar, _super);
    function Calendar(startDayArg, indexDayArg) {
        var _this = _super.call(this) || this;
        _this.startDayValue = startDayArg;
        _this.indexDay = indexDayArg;
        _this.textButtonChangeTransparent = 'To open another month data';
        _this.isSchedulerChecked = true;
        _this.Months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
        return _this;
    }
    Calendar.prototype.showNextMonth = function () {
        if (currentMonth == 11) {
            currentMonth = 0;
            currentYear = currentYear + 1;
        }
        else {
            currentMonth = currentMonth + 1;
        }
        this.showcurrent();
    };
    Calendar.prototype.showPreviousMonth = function () {
        if (currentMonth == 0) {
            currentMonth = 11;
            currentYear = currentYear - 1;
        }
        else {
            currentMonth = currentMonth - 1;
        }
        this.showcurrent();
    };
    Calendar.prototype.showcurrent = function () {
        this.showMonth(currentYear, currentMonth);
    };
    Calendar.prototype.showMonth = function (y, m) {
        firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();
        lastDateOfMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
        lastDayOfLastMonth = currentMonth == 0 ? new Date(y - 1, 11, 0).getDate() : new Date(currentYear, currentMonth, 0).getDate();
        var month = new Month();
        month.createFirstPartTemplate(y, m);
        month.createFullMonth(y, m);
        month.createLastPartTemplate();
        todo_1.buildTodo(this.isSchedulerChecked);
        if (isWearherChecked == true) {
            var Weath = new weather_1.Weather();
            Weath.getWeatherForecast();
        }
    };
    return Calendar;
}(Grid));
exports.Calendar = Calendar;
var Renderer = /** @class */ (function (_super) {
    __extends(Renderer, _super);
    function Renderer() {
        var _this = _super.call(this) || this;
        _super.prototype.showMonth.call(_this, currentYear, currentMonth);
        return _this;
    }
    Renderer.prototype.getIndexOfStartDayOff = function () {
        if (startDayOffValue == 'Sat-Sun') {
            arrayDayOff = [daysOfWeekWithSunday.indexOf('Sat'), daysOfWeekWithSunday.indexOf('Sun')];
        }
        else {
            arrayDayOff = [daysOfWeekWithSunday.indexOf('Mon'), daysOfWeekWithSunday.indexOf('Tue')];
        }
        return arrayDayOff;
    };
    Renderer.prototype.getValueDaysOfStartDayOffValue = function (el) {
        startDayOffValue = el.value;
        this.getIndexOfStartDayOff();
        this.getIndexOfFirstDayCalendar();
        _super.prototype.showMonth.call(this, currentYear, currentMonth);
        ;
    };
    ;
    Renderer.prototype.getIndexOfFirstDayCalendar = function () {
        if (daysOfWeekWithSunday[0] == 'Mon') {
            indexOfFirstDayCalendar = 1;
        }
        else {
            indexOfFirstDayCalendar = 0;
        }
        return indexOfFirstDayCalendar;
    };
    Renderer.prototype.getValueDaysOfWeekWithSunday = function (el) {
        this.startDayValue = el.value;
        this.indexDay = daysOfWeekWithSunday.indexOf(this.startDayValue);
        var insert = function (arr, index) { return __spreadArrays(arr.slice(index, 7), arr.slice(0, index)); };
        var result = insert(daysOfWeekWithSunday, this.indexDay);
        daysOfWeekWithSunday = result;
        this.getIndexOfFirstDayCalendar();
        this.getIndexOfStartDayOff();
        _super.prototype.showMonth.call(this, currentYear, currentMonth);
        ;
    };
    ;
    Renderer.prototype.getValueIsChedule = function (el) {
        this.isSchedulerChecked = el.checked;
        document.querySelector('.scheduler__clarification').classList.toggle('scheduler__clarification_none');
        if (el.checked) {
            this.isSchedulerChecked = true;
        }
        else {
            this.isSchedulerChecked = false;
        }
        _super.prototype.showMonth.call(this, currentYear, currentMonth);
        ;
    };
    ;
    Renderer.prototype.getValueIsWeather = function (el) {
        isWearherChecked = el.checked;
        document.querySelector('.weather__clarification_none').classList.toggle('weather__clarification');
        if (el.checked) {
            isWearherChecked = true;
        }
        else {
            isWearherChecked = false;
        }
        _super.prototype.showMonth.call(this, currentYear, currentMonth);
        ;
    };
    ;
    Renderer.prototype.toggleClassIfTransparent = function () {
        if (this.textButtonChangeTransparent == 'To hide another month data') {
            TDTransparent = '<td class="days__transparent">';
        }
        else {
            TDTransparent = '<td class="days__not-current">';
        }
        return TDTransparent;
    };
    Renderer.prototype.getValueTextButton = function (el) {
        el.innerText = this.textButtonChangeTransparent;
        if (this.textButtonChangeTransparent == 'To hide another month data') {
            this.textButtonChangeTransparent = 'To open another month data';
        }
        else {
            this.textButtonChangeTransparent = "To hide another month data";
        }
        this.toggleClassIfTransparent();
        _super.prototype.showMonth.call(this, currentYear, currentMonth);
    };
    return Renderer;
}(Calendar));
exports.Renderer = Renderer;
var Month = /** @class */ (function (_super) {
    __extends(Month, _super);
    function Month(indArg, dowArg, kArg, sArg, calendar__appArg) {
        var _this = _super.call(this) || this;
        _this.today = date.getDate();
        _this.todayYear = date.getFullYear();
        _this.todayMonth = date.getMonth();
        _this.arrayDayHoliday = config_value_1.getDayHolidayFromObject(config);
        _this.arrayMonthHoliday = config_value_1.getMonthHolidayFromObject(config);
        _this.calendar__app = calendar__appArg;
        _this.dow = dowArg;
        _this.ind = indArg;
        _this.k = kArg;
        _this.s = sArg;
        return _this;
    }
    Month.prototype.createFirstPartTemplate = function (y, m) {
        this.calendar__app = '';
        this.calendar__app += "<table class=\"days__wrapper\">\n                            <thead class=\"days__header\">\n                                <tr>\n                                <td colspan=\"7\"> " + this.Months[m] + " " + y + " </td>\n                                </tr>\n                            </thead>";
        this.calendar__app += '<tr class="days__names">';
        for (var i = 0; i < daysOfWeekWithSunday.length; i++) {
            this.calendar__app += '<td>' + daysOfWeekWithSunday[i] + '</td>';
        }
        this.calendar__app += '</tr>';
    };
    Month.prototype.createFullMonth = function (y, m) {
        var valDayHolidays = Object.values(this.arrayDayHoliday);
        var valMonthHolidays = Object.values(this.arrayMonthHoliday);
        this.ind = 1;
        do {
            this.dow = new Date(y, m, this.ind - indexOfFirstDayCalendar).getDay();
            if (this.dow == 0) {
                this.calendar__app += '<tr>';
            }
            else if (this.ind == 1) {
                this.calendar__app += '<tr>';
                this.s = lastDayOfLastMonth - firstDayOfMonth + indexOfFirstDayCalendar + 1;
                for (var j = 0; j < firstDayOfMonth - indexOfFirstDayCalendar; j++) {
                    this.calendar__app += TDTransparent + " " + this.s + " </td>";
                    this.s++;
                }
            }
            if (this.todayYear == y && this.todayMonth == m && this.ind == currentDay) {
                this.calendar__app += "<td class=\"days__today\" data-text= \"" + y + "-" + (m + 1) + "-" + this.ind + "\" data-trigger=\"false\"> " + this.ind + " </td>";
            }
            else if ((this.dow == arrayDayOff[0]) || (this.dow == arrayDayOff[1])) {
                this.calendar__app += "<td class=\"days__day-off\" data-text= \"" + y + "-" + (m + 1) + "-" + this.ind + "\" data-trigger=\"false\"> " + this.ind + " </td>";
            }
            else if (valDayHolidays.indexOf(this.ind) != -1 && valMonthHolidays.indexOf(m) != -1 && valDayHolidays.indexOf(this.ind) == valMonthHolidays.indexOf(m)) {
                this.calendar__app += "<td class=\"days__holidays\" data-text= \"" + y + "-" + (m + 1) + "-" + this.ind + "\" data-trigger=\"false\"> " + this.ind + " </td>";
            }
            else {
                this.calendar__app += "<td class=\"days__normal\" data-text= \"" + y + "-" + (m + 1) + "-" + this.ind + "\" data-trigger=\"false\"> " + this.ind + " </td>";
            }
            if (this.dow == 6) {
                this.calendar__app += '</tr>';
            }
            else if (this.ind == lastDateOfMonth) {
                this.k = 1;
                for (this.dow; this.dow < 6; this.dow++) {
                    this.calendar__app += TDTransparent + this.k + '</td>';
                    this.k++;
                }
            }
            this.ind++;
        } while (this.ind <= lastDateOfMonth);
    };
    Month.prototype.createLastPartTemplate = function () {
        this.calendar__app += '</table>';
        document.getElementById("divCal1").innerHTML = this.calendar__app;
    };
    return Month;
}(Calendar));
