// elements from html file
const timeElement = document.getElementById('time');
const dateElement = document.getElementById('date');
const currentWeatherItemsElement = document.getElementById('current-weather-items');
const timeZone = document.getElementById('time-zone');
const countryElement = document.getElementById('country');
const weatherForecastElement = document.getElementById('weather-forecast');
const currentTemperatureElement = document.getElementById('current-temp');
const futureWeatherElement = document.getElementById('');
const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

// API KEY openweathermap.org
const API_KEY = '058c0952312529dfc66d1c729c2cea6a';

setInterval(() => {
    const time = new Date();
    const month = time.getMonth();
    const day = time.getDay();
    const date = time.getDate();
    const year = time.getFullYear();
    const hour = time.getHours();
    const hoursIn12hrFormat = hour === 0 ? 12 : hour >= 13 ? hour %12: hour;
    const minutes = time.getMinutes();
    const minutesFormula = minutes === 0 ? "00" : (minutes < 10 ? "0" : "") + minutes;
    const ampm = hour >= 12 ? 'PM' : 'AM';

     //Time fetch
    timeElement.innerHTML = hoursIn12hrFormat + ':' + minutesFormula + `<span id ="am-pm">${ampm}</span>`
    // Date fetch
    dateElement.innerHTML = days[day] + ' | ' + months[month] + ' ' + date + ', ' + year;
}, 1000);

getWeatherData();
function getWeatherData () {
    navigator.geolocation.getCurrentPosition((success) =>{
        let {latitude, longitude } = success.coords;
        fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&exclude=hourly,minutely&units=imperial&appid=${API_KEY}`).then(res => res.json()).then(data => {
            console.log(data)
            showWeatherData(data);
        })
    })
}

function showWeatherData (data){
    let feels_Like = data.list[0].main.feels_like;
    let humidity = data.list[0].main.humidity;
    let wind_speed = data.list[0].wind.speed;
    let sunrise = data.city.sunrise;
    let sunset = data.city.sunset;
    let temperature = data.list[0].main.temp;
    
    countryElement.innerHTML = data.city.coord.lat + 'N ' + data.city.coord.lon + 'E '
    currentWeatherItemsElement.innerHTML = 
    `<div class="weather-item">
        <div>Current</div>
        <div>${temperature} \u00b0F</div>
    </div>
    <div class="weather-item">
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
        <div>${window.moment(sunrise * 1000).format('hh:mm a')}</div>
    </div>
    <div class="weather-item">
        <div>Sunset</div>
        <div>${window.moment(sunset * 1000).format('hh:mm a')}</div>
    </div>
    `;
};

// API weatherapi.com
getWeatherData2();
function getWeatherData2 () {
    navigator.geolocation.getCurrentPosition((success2) =>{
        let {latitude, longitude } = success2.coords;
        fetch(`https://api.weatherapi.com/v1/forecast.json?key=b12be161049c4d4c93f33500232001&q=${latitude},${longitude}&days=10&aqi=no&alerts=no`).then(res => res.json()).then(data2 => {
            console.log(data2)
            showWeatherData2(data2);
        })
    })
};

function showWeatherData2(data2) {
// current icon
    timeZone.innerHTML = data2.location.name + ', ' + data2.location.region;
    data2.forecast.forecastday.forEach((date) => {
          if(data2.forecast.forecastday[0]){       
    currentTemperatureElement.innerHTML = 
    `
    <img src="https:${data2.forecast.forecastday[0].day.condition.icon}" alt="weather-icon" class="w-icon">
    <div class="other">
        <div class="day">${'Today'}</div>
        <div class="temp">Night: ${date.day.mintemp_f}&#176; F</div>
        <div class="temp">Day:  ${date.day.maxtemp_f}&#176; F</div>
    </div>
    `
        }
    })
    data2.forecast.forecastday.slice(1).forEach(date2 => {
        
        let icon = `<img src="http:${date2.day.condition.icon}" alt="weather-icon" class="w-icon">`;
        let day = `<div class="day">${window.moment(date2.date).format('dddd')}</div>`;
        let minTemp = `<div class="temp">Night: ${date2.day.mintemp_f}&#176; F</div>`;
        let maxTemp = `<div class="temp">Day: ${date2.day.maxtemp_f}&#176; F</div>`;
        let other = `<div class="other">${day}${minTemp}${maxTemp}</div>`;
        weatherForecastElement.innerHTML += icon + other;
      });

};
