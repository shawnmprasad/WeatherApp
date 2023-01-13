// elements from html file
const timeElement = document.getElementById('time');
const dateElement = document.getElementById('date');
const currentWeatherItemsElement = document.getElementById('current-weather-items');
const timeZone = document.getElementById('time-zone');
const countryElement = document.getElementById('country');
const weatherForecastElement = document.getElementById('weather-forecast');
const currentTemperatureElement = document.getElementById('current-temp');
const futureWeatherElement = document.getElementById('')

const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

// API KEY openweathermap.org
const API_KEY = '058c0952312529dfc66d1c729c2cea6a';

setInterval(() => {
    const time = new Date();
    const month = time.getMonth();
    const day = time.getDay();
    const date = time.getDate();
    const hour = time.getHours();
    const hoursIn12hrFormat = hour >= 13 ? hour %12: hour
    const minutes = time.getMinutes();
    const ampm = hour >= 12 ? 'PM' : 'AM';
     //Time fetch
    timeElement.innerHTML = hoursIn12hrFormat + ':' + minutes + `<span id ="am-pm">${ampm}</span>`
    // Date fetch
    dateElement.innerHTML = days[day] + ', ' + date + ' ' + months[month];
}, 1000);

getWeatherData();
function getWeatherData () {
    navigator.geolocation.getCurrentPosition((success) =>{
        let {latitude, longitude } = success.coords;

        fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&exclude=hourly,minutely&units=imperial&appid=${API_KEY}`).then(res => res.json()).then(data => {
            console.log(data)
            showWeatherData(data);
        })
    })
}

function showWeatherData (data){
    // let (humidity, pressure, sunrise, sunset , wind_speed) = data.main;
    let feels_Like = data.main.feels_like;
    let humidity = data.main.humidity;
    let wind_speed = data.wind.speed;
    let sunrise = data.sys.sunrise;
    let sunset = data.sys.sunset;
    currentWeatherItemsElement.innerHTML = 
    `<div class="weather-item">
        <div>Feels Like</div>
        <div>${feels_Like} \u00b0F</div>
    </div>
    <div class="weather-item">
        <div>Humidity</div>
        <div>${humidity}%</div>
    </div>
    <div class="weather-item">
        <div>Wind Speed</div>
        <div>${wind_speed} mph</div>
    </div>
    <div class="weather-item">
        <div>Sunrise</div>
        <div>${window.moment(sunrise * 1000).format('HH:mm a')}</div>
    </div>
    <div class="weather-item">
        <div>Sunset</div>
        <div>${window.moment(sunset * 1000).format('HH:mm a')}</div>
    </div>
    `;
    let otherDayForecast = '';
    data.daily.forEach((day, idx) => {
        if(idx == 0){

        }else {
            otherDayForecast += `
            <div class="weather-forecast-item">
                <div class="day">${window.moment(day.dt * 1000).format('ddd')}</div>
                <img src=url(http://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png) alt="weather-icon" class="w-icon">
                <div class="temp">Night - 25.6&#176; F</div>
                <div class="temp">Day - 25.6&#176; F</div>
            </div>
            `
        }
    })
}

//test for 2nd api
getWeatherData2();
function getWeatherData2 () {
    navigator.geolocation.getCurrentPosition((success) =>{
        let {latitude, longitude } = success.coords;

        fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&exclude=hourly,minutely&units=imperial&appid=${API_KEY}`).then(res => res.json()).then(data2 => {
            console.log(data2)
            showWeatherData2(data2);
        })
    })
}

function showWeatherData2 (data2){
    let tmrwFeelsLike = data2.list[0].main.feels_like;
    let humidity = data.main.humidity;
    let wind_speed = data.wind.speed;
    let sunrise = data.sys.sunrise;
    let sunset = data.sys.sunset;
}

console.log(showWeatherData2.tmrwFeelsLike);
