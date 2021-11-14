"use strict";
exports.__esModule = true;
require("./scss/style.scss");
var svg_1 = require("./svg");
var calendar_1 = require("./calendar");
var calendar_2 = require("./calendar");
window.onload = function () {
    svg_1.importSVG();
    var calendar = new calendar_1.Calendar();
    calendar.showcurrent();
    var render = new calendar_2.Renderer();
    document.getElementById('startDay').addEventListener('change', function () { return render.getValueDaysOfWeekWithSunday(document.getElementById('startDay')); });
    document.getElementById('scheduler').addEventListener('change', function () { return render.getValueIsChedule(document.getElementById('scheduler')); });
    document.getElementById('btnChange').addEventListener('click', function () { return render.getValueTextButton(document.getElementById('btnChange')); });
    document.getElementById('startDayOff').addEventListener('change', function () { return render.getValueDaysOfStartDayOffValue(document.getElementById('startDayOff')); });
    document.getElementById('weather').addEventListener('change', function () { return render.getValueIsWeather(document.getElementById('weather')); });
    document.getElementById('btnNext').addEventListener('click', function () { return calendar.showNextMonth(); });
    document.getElementById('btnPrev').addEventListener('click', function () { return calendar.showPreviousMonth(); });
};
