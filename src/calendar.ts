import {Weather} from "./weather";
const config = require("./config.json") as Config;
import {getMonthHolidayFromObject, getDayHolidayFromObject, Config} from "./config-value";
import {buildTodo} from "./todo";

const date = new Date();
let currentMonth = date.getMonth();
let currentYear = date.getFullYear();
let firstDayOfMonth: number;
let lastDateOfMonth: number;
let lastDayOfLastMonth: number;
let isWearherChecked: boolean = false;
let currentDay = date.getDate();
let startDayOffValue: string = 'Sat-Sun';
let daysOfWeekWithSunday: Array<string> = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']; 
let indexOfFirstDayCalendar: number = 0;
let TDTransparent: string = '<td class="days__not-current">';
let arrayDayOff: Array<number> = [6, 0];


abstract class Grid {
    abstract showNextMonth(): void
    abstract showPreviousMonth(): void
    abstract showcurrent(): void
}

class Calendar extends Grid {
    startDayValue: string;
    indexDay: number;
    textButtonChangeTransparent: string;
    isSchedulerChecked: boolean;
    Months: ReadonlyArray<string>;

    constructor(startDayArg?: string, indexDayArg?: number) {
        super();
        this.startDayValue = startDayArg; 
        this.indexDay = indexDayArg;
        this.textButtonChangeTransparent = 'To open another month data'; 
        this.isSchedulerChecked = true;
        this.Months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    }

    showNextMonth(): void {
        if (currentMonth == 11) {
        currentMonth = 0;
        currentYear = currentYear + 1;
        } else {
          currentMonth = currentMonth + 1;
        }
        this.showcurrent();
    }

    showPreviousMonth(): void {
        if (currentMonth == 0) {
          currentMonth = 11;
          currentYear = currentYear - 1;
        } else {
          currentMonth = currentMonth - 1;
        }
        this.showcurrent();
    }
    
    showcurrent(): void {
        this.showMonth(currentYear, currentMonth);
    }

    showMonth(y: number, m: number): void {
        firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();
        lastDateOfMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
        lastDayOfLastMonth = currentMonth == 0 ? new Date(y - 1, 11, 0).getDate() : new Date(currentYear, currentMonth, 0).getDate();
    
        let month: Month = new Month();
        month.createFirstPartTemplate(y, m)
        month.createFullMonth(y, m)
        month.createLastPartTemplate();
    
        buildTodo(this.isSchedulerChecked);
    
        if(isWearherChecked  == true) {
          const Weath: Weather = new Weather();
          Weath.getWeatherForecast();
        }  
    }
}

class Renderer extends Calendar {

    constructor() {
        super();
        super.showMonth(currentYear, currentMonth);
    } 
  
    getIndexOfStartDayOff(): Array<number> {
        if (startDayOffValue == 'Sat-Sun') {
            arrayDayOff = [daysOfWeekWithSunday.indexOf('Sat'), daysOfWeekWithSunday.indexOf('Sun')];
        } else {
            arrayDayOff = [daysOfWeekWithSunday.indexOf('Mon'), daysOfWeekWithSunday.indexOf('Tue')];
        }
        return arrayDayOff;
    }
  
    getValueDaysOfStartDayOffValue(el: HTMLElement): void {
        startDayOffValue = (<HTMLInputElement>el).value;
        this.getIndexOfStartDayOff(); 
        this.getIndexOfFirstDayCalendar();
        super.showMonth(currentYear, currentMonth);;
    }; 
  
    getIndexOfFirstDayCalendar(): number {
        if (daysOfWeekWithSunday[0] == 'Mon') {
            indexOfFirstDayCalendar = 1;
        } else {
            indexOfFirstDayCalendar = 0;
        }
        return indexOfFirstDayCalendar;
    }
  
    getValueDaysOfWeekWithSunday(el: HTMLElement): void {
        this.startDayValue = (<HTMLInputElement>el).value;
        this.indexDay = daysOfWeekWithSunday.indexOf(this.startDayValue);
        const insert = (arr, index) => [
            ...arr.slice(index, 7),
            ...arr.slice(0, index)
        ]
        const result: Array<string> = insert(daysOfWeekWithSunday, this.indexDay);
        daysOfWeekWithSunday = result;
        this.getIndexOfFirstDayCalendar();
        this.getIndexOfStartDayOff(); 
        super.showMonth(currentYear, currentMonth);;
    };
  
    getValueIsChedule(el: HTMLElement): void {
        this.isSchedulerChecked = (<HTMLInputElement>el).checked;
        document.querySelector('.scheduler__clarification').classList.toggle('scheduler__clarification_none')
        if ((<HTMLInputElement>el).checked) {
            this.isSchedulerChecked = true;
        } else {
            this.isSchedulerChecked = false;
        }
        super.showMonth(currentYear, currentMonth);;
    }; 
  
    getValueIsWeather(el: HTMLElement): void {
        isWearherChecked = (<HTMLInputElement>el).checked;
        document.querySelector('.weather__clarification_none').classList.toggle('weather__clarification') 
        if ((<HTMLInputElement>el).checked) {
            isWearherChecked = true;
        } else {
            isWearherChecked = false;
        }
        super.showMonth(currentYear, currentMonth);;
    }; 
  
    toggleClassIfTransparent(): string {
        if (this.textButtonChangeTransparent == 'To hide another month data') {
            TDTransparent = '<td class="days__transparent">';
        } else {
            TDTransparent = '<td class="days__not-current">';
        }
        return TDTransparent;
    } 
    
    getValueTextButton(el: HTMLElement): void {
        el.innerText = this.textButtonChangeTransparent;
        if (this.textButtonChangeTransparent  == 'To hide another month data') {
            this.textButtonChangeTransparent = 'To open another month data';
        } else {
            this.textButtonChangeTransparent = "To hide another month data";
        }
        this.toggleClassIfTransparent();
        super.showMonth(currentYear, currentMonth);
    }
}

class Month extends Calendar{
    dow: number;
    ind: number;
    k: number;
    s: number;
    arrayDayHoliday: {};
    arrayMonthHoliday: {};
    calendar__app: string; 
    today: number = date.getDate();
    todayYear: number = date.getFullYear();
    todayMonth:  number = date.getMonth();

    constructor(indArg?: number, dowArg?: number, kArg?: number, sArg?: number, calendar__appArg?: string) {
        super();
        this.arrayDayHoliday  = getDayHolidayFromObject(config);
        this.arrayMonthHoliday = getMonthHolidayFromObject(config);  
        this.calendar__app = calendar__appArg;
        this.dow = dowArg;
        this.ind = indArg;
        this.k = kArg;
        this.s = sArg;
    }

    createFirstPartTemplate(y: number, m: number): void  {
        this.calendar__app = '';
        this.calendar__app += `<table class="days__wrapper">
                            <thead class="days__header">
                                <tr>
                                <td colspan="7"> ${this.Months[m]} ${y} </td>
                                </tr>
                            </thead>`;
        this.calendar__app += '<tr class="days__names">';
        for (let i = 0; i < daysOfWeekWithSunday.length; i++) {
            this.calendar__app += '<td>' + daysOfWeekWithSunday[i] + '</td>';
        }
        this.calendar__app += '</tr>';
    }
  
    createFullMonth(y: number, m: number): void  {
        let valDayHolidays =  Object.values(this.arrayDayHoliday);
        let valMonthHolidays =  Object.values(this.arrayMonthHoliday);
        this.ind = 1;
        do {
            this.dow = new Date(y, m, this.ind - indexOfFirstDayCalendar).getDay();
    
            if (this.dow == 0) {
                this.calendar__app += '<tr>';
            } else if (this.ind == 1) {
                this.calendar__app += '<tr>';
                this.s =  lastDayOfLastMonth -  firstDayOfMonth + indexOfFirstDayCalendar + 1;
                for (let j = 0; j <  firstDayOfMonth - indexOfFirstDayCalendar; j++) {
                    this.calendar__app += `${TDTransparent} ${this.s} </td>`;
                    this.s++;
                }
            } 
            
            if (this.todayYear == y && this.todayMonth == m && this.ind == currentDay) {
                this.calendar__app += `<td class="days__today" data-text= "${y}-${m+1}-${this.ind}" data-trigger="false"> ${this.ind} </td>`;
            } else if ((this.dow == arrayDayOff[0]) || (this.dow == arrayDayOff[1])) {
                this.calendar__app += `<td class="days__day-off" data-text= "${y}-${m+1}-${this.ind}" data-trigger="false"> ${this.ind} </td>`;
            } else if (valDayHolidays.indexOf(this.ind) != -1 && valMonthHolidays.indexOf(m) != -1 && valDayHolidays.indexOf(this.ind) == valMonthHolidays.indexOf(m)) {
                this.calendar__app += `<td class="days__holidays" data-text= "${y}-${m+1}-${this.ind}" data-trigger="false"> ${this.ind} </td>`;
            } else {
                this.calendar__app += `<td class="days__normal" data-text= "${y}-${m+1}-${this.ind}" data-trigger="false"> ${this.ind} </td>`;
            }
    
            if (this.dow == 6) {
                this.calendar__app += '</tr>';
            } else if (this.ind ==  lastDateOfMonth) {
                this.k = 1;
                for (this.dow; this.dow < 6; this.dow++) {
                    this.calendar__app += TDTransparent + this.k + '</td>';
                    this.k++;
                }
            }
            this.ind++;
            
        } while (this.ind <=  lastDateOfMonth);
    }
  
    createLastPartTemplate(): void {
        this.calendar__app += '</table>';
        document.getElementById("divCal1").innerHTML = this.calendar__app;
    }
}

export {Calendar};
export {Renderer};