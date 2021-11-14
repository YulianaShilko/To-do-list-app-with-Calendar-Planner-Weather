"use strict";
exports.__esModule = true;
var weather;
var Weather = /** @class */ (function () {
    function Weather(weather__appArg) {
        this.keyAPI = 'de710933c5e7078798580c96270dae75';
        this.datesArray = [];
        this.objDailyWeather = {};
        this.objTodayWeather = {};
        this.weather__app = weather__appArg;
    }
    Weather.prototype.getWeatherForecast = function () {
        var self = this;
        return fetch('https://api.openweathermap.org/data/2.5/onecall?lat=53.90&lon=30.33&exclude=hourly,minutely&appid=' + this.keyAPI)
            .then(function (resp) {
            return resp.json();
        })
            .then(function (value) {
            self.getDailyWeatherObj(value);
            self.getTodayWeatherObject(value);
            self.createWeather(value);
        })["catch"](function (resp) {
            alert('Network request failed with response ' + resp.name + ':' + resp.message);
        });
    };
    Weather.prototype.getDailyWeatherObj = function (value) {
        var dailyArray = value.daily;
        for (var i = 0; i < dailyArray.length; i++) {
            var nextCurDate = (new Date(+(value.current.dt + '000') + 86400000 * i)).toISOString();
            if (nextCurDate[8] == '0') {
                this.datesArray.push(nextCurDate.slice(0, 8) + nextCurDate.slice(9, 10));
            }
            else {
                this.datesArray.push(nextCurDate.substr(0, 10));
            }
        }
        for (var i = 1; i <= dailyArray.length; i++) {
            var key = this.datesArray[i];
            var val = dailyArray[i];
            this.objDailyWeather[key] = val;
        }
        return this.objDailyWeather;
    };
    Weather.prototype.getTodayWeatherObject = function (value) {
        var key;
        var today = (new Date).toISOString();
        if (today[8] == '0') {
            key = today.slice(0, 8) + today.slice(9, 10);
        }
        else {
            key = today.substr(0, 10);
        }
        var val = value.current;
        this.objTodayWeather[key] = val;
        return this.objTodayWeather;
    };
    Weather.prototype.createWeatherDiv = function () {
        weather = document.createElement('div');
        weather.className = 'weather-item';
        weather.id = 'weather-APP';
        document.body.append(weather);
    };
    Weather.prototype.fulfillWeatherDiv = function (header, icon, desc, temp) {
        this.weather__app = '';
        this.weather__app += "<h1 class=\"weather__header\" id=\"w-header\">" + header + "</h1>\n                            <div class=\"weather__icon\" id=\"w-icon\"><img id=\"wicon\" src=\"http://openweathermap.org/img/w/" + icon + ".png\" alt=\"Weather icon\"></div>\n                            <div class=\"weather__description\" id=\"w-description\">" + desc + "</div>\n                            <h1 class=\"weather__temp\" id=\"w-temp\">" + Math.round(temp - 273.15) + "&deg</h1>\n                            <div class=\"weather__location\">Mogilev</div>";
        return this.weather__app;
    };
    Weather.prototype.drawWeather = function (icon, desc, temp, index) {
        var self = this;
        return function (event) {
            var target = event.target;
            self.createWeatherDiv();
            this.weather__app = self.fulfillWeatherDiv(this.dataset.text, icon, desc, temp);
            document.getElementById("weather-APP").innerHTML = this.weather__app;
            var coords = target.getBoundingClientRect();
            var left = coords.left + (target.offsetWidth - weather.offsetWidth) / 2;
            if (left < 0)
                left = 0;
            var top = coords.top - weather.offsetHeight - 5;
            if (top < 0) {
                top = coords.top + target.offsetHeight + 5;
            }
            weather.style.left = left + 'px';
            weather.style.top = top + 'px';
        };
    };
    Weather.prototype.deleteWeather = function () {
        return function (e) {
            if (weather) {
                weather.remove();
                weather = null;
            }
        };
    };
    Weather.prototype.createWeather = function (value) {
        var self = this;
        document.querySelectorAll('td').forEach(function (el) {
            if ((Object.keys(self.objDailyWeather)).indexOf(el.dataset.text) != -1) {
                var index = (Object.keys(self.objDailyWeather)).indexOf(el.dataset.text);
                el.addEventListener("mouseover", self.drawWeather(value.daily[index].weather[0].icon, value.daily[index].weather[0].description, value.daily[index].temp.day, index));
                el.addEventListener("mouseout", self.deleteWeather());
            }
            else if ((Object.keys(self.objTodayWeather)).indexOf(el.dataset.text) != -1) {
                el.addEventListener("mouseover", self.drawWeather(value.current.weather[0].icon, value.current.weather[0].description, value.current.temp));
                el.addEventListener("mouseout", self.deleteWeather());
            }
        });
    };
    return Weather;
}());
exports.Weather = Weather;
