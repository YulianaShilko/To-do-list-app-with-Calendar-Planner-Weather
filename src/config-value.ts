interface Config {
    holiday: {
        day: number;
        month: number;
    }
}

function getDayHolidayFromObject(incomeObject: Config): {} {
    let arrayDayHoliday = [] as Array<number>; 
    const dataHolidays = Object.values(incomeObject);
    for (let i = 0; i < dataHolidays.length; i++) {
      arrayDayHoliday.push(dataHolidays[i].day);
    }
    return {
      arrayDayHoliday
    }
} 
  
function getMonthHolidayFromObject(incomeObject: Config): {} {
    let arrayMonthHoliday = [] as Array<number>; 
    const dataHolidays = Object.values(incomeObject);
    for (let i = 0; i < dataHolidays.length; i++) {
      arrayMonthHoliday.push(dataHolidays[i].month - 1);
    }
    return {
      arrayMonthHoliday
    }
} 

export {getMonthHolidayFromObject, getDayHolidayFromObject, Config};