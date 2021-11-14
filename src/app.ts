import "./scss/style.scss";
import {importSVG} from "./svg"; 
import {Calendar} from "./calendar";
import {Renderer} from "./calendar"; 

window.onload = function () {
    importSVG();

    const calendar: Calendar = new Calendar();
    calendar.showcurrent();

    let render = new Renderer();
    document.getElementById('startDay').addEventListener('change', () => render.getValueDaysOfWeekWithSunday(document.getElementById('startDay')));
    document.getElementById('scheduler').addEventListener('change', () =>  render.getValueIsChedule(document.getElementById('scheduler')));
    document.getElementById('btnChange').addEventListener('click', () =>  render.getValueTextButton(document.getElementById('btnChange')));
    document.getElementById('startDayOff').addEventListener('change', () => render.getValueDaysOfStartDayOffValue(document.getElementById('startDayOff')));
    document.getElementById('weather').addEventListener('change', () =>  render.getValueIsWeather(document.getElementById('weather')));
    document.getElementById('btnNext').addEventListener('click', () =>  calendar.showNextMonth());
    document.getElementById('btnPrev').addEventListener('click', () =>  calendar.showPreviousMonth());
}