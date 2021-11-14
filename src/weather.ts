let weather: HTMLDivElement; 
interface CurrentWeatherServer {
    dt: number;
    weather: {
        description: string;
        icon: string;
    };
    temp: number;
} 
interface DailyWeatherServer {
    dt: number;
    weather: {
        description: string;
        icon: string;
    };
    temp: {
        day: number;
    }
}

interface WeatherServer {
    current: CurrentWeatherServer;
    lat: number;
    lon: number;
    timezone: string;
    timezone_offset: number;
    daily: Array<DailyWeatherServer>;
}
interface TodayWeather {
    key: string; 
    val: CurrentWeatherServer
}
interface DailyWeather {
    key: string[]; 
    val: Array<DailyWeatherServer>;
}

class Weather {
    keyAPI: string;
    datesArray: Array<string>;
    weather__app: string;
    objDailyWeather: DailyWeather; 
    objTodayWeather: TodayWeather; 

    constructor(weather__appArg?: string) {
        this.keyAPI = 'de710933c5e7078798580c96270dae75';
        this.datesArray = [] as Array<string>;
        this.objDailyWeather = {} as DailyWeather;
        this.objTodayWeather = {} as TodayWeather;
        this.weather__app = weather__appArg;
    }
    
    getWeatherForecast(): Promise<any> {
        const self = this; 
        return fetch('https://api.openweathermap.org/data/2.5/onecall?lat=53.90&lon=30.33&exclude=hourly,minutely&appid=' + this.keyAPI)
            .then(function (resp){
                return resp.json() as Promise<any>;
            })
            .then(function (value: WeatherServer):void  {
                self.getDailyWeatherObj(value); 
                self.getTodayWeatherObject(value); 
                self.createWeather(value); 
            })
            .catch(function (resp):void {
                alert('Network request failed with response ' + resp.name + ':' + resp.message);
            });
    } 
  
    getDailyWeatherObj(value: WeatherServer): DailyWeather {
        let dailyArray = value.daily;
        for (let i=0; i< dailyArray.length; i++) {
            let nextCurDate = (new Date(+(value.current.dt + '000') + 86400000 * i)).toISOString();
            if(nextCurDate[8] == '0') {
                this.datesArray.push(nextCurDate.slice(0, 8) + nextCurDate.slice(9, 10));
            } else {
                this.datesArray.push(nextCurDate.substr(0, 10));
            }
        }
        for (let i = 1; i <= dailyArray.length; i++) {
            let key = this.datesArray[i];
            let val = dailyArray[i];
            this.objDailyWeather[key] = val;
        } 
        return this.objDailyWeather;   
    }
   
    getTodayWeatherObject(value: WeatherServer): TodayWeather {
        let key: string;
        let today = (new Date).toISOString();
        if(today[8] == '0') {
            key = today.slice(0, 8) + today.slice(9, 10);
        } else { 
            key = today.substr(0, 10);
        }
        let val = value.current;
        this.objTodayWeather[key] = val;
        return this.objTodayWeather;
    }
  
    createWeatherDiv(): void {
        weather = document.createElement('div');
        weather.className = 'weather-item';
        weather.id = 'weather-APP';
        document.body.append(weather); 
    }
  
    fulfillWeatherDiv(header: string, icon: string, desc: string, temp: number): string {
        this.weather__app = '';
        this.weather__app += `<h1 class="weather__header" id="w-header">${header}</h1>
                            <div class="weather__icon" id="w-icon"><img id="wicon" src="http://openweathermap.org/img/w/${icon}.png" alt="Weather icon"></div>
                            <div class="weather__description" id="w-description">${desc}</div>
                            <h1 class="weather__temp" id="w-temp">${Math.round(temp - 273.15)}&deg</h1>
                            <div class="weather__location">Mogilev</div>`;
        return this.weather__app;
    } 
  
    drawWeather(icon: string, desc: string, temp: number, index?: number): any {
        const self = this;
        return function(event: Event): void {
            let target = event.target as HTMLElement;
            self.createWeatherDiv();
            this.weather__app = self.fulfillWeatherDiv(this.dataset.text, icon, desc, temp); 
            document.getElementById("weather-APP").innerHTML = this.weather__app;
        
            let coords = target.getBoundingClientRect();
            let left = coords.left + (target.offsetWidth - weather.offsetWidth) / 2;
            if (left < 0) left = 0;
            let top = coords.top - weather.offsetHeight - 5;
            if (top < 0) { 
                top = coords.top + target.offsetHeight + 5;
            }
            weather.style.left = left + 'px';
            weather.style.top = top + 'px'; 
        }     
    }
  
    deleteWeather(): any {
        return function(e: Event) { 
            if (weather) {
                weather.remove();
                weather = null;
            }  
        }
    } 
  
    createWeather(value: WeatherServer): void {
        const self = this;
        document.querySelectorAll('td').forEach(el => { 
            if ((Object.keys(self.objDailyWeather)).indexOf(el.dataset.text) != -1) {
                let index = (Object.keys(self.objDailyWeather)).indexOf(el.dataset.text);
                el.addEventListener("mouseover", self.drawWeather(value.daily[index].weather[0].icon, value.daily[index].weather[0].description, value.daily[index].temp.day, index ));
                el.addEventListener("mouseout", self.deleteWeather());
            } else if ((Object.keys(self.objTodayWeather)).indexOf(el.dataset.text) != -1) { 
                el.addEventListener("mouseover", self.drawWeather(value.current.weather[0].icon, value.current.weather[0].description, value.current.temp));
                el.addEventListener("mouseout", self.deleteWeather());
            }
        })
    }
} 

export {Weather};
