const timeEl = document.getElementById('time');
const dateEl = document.getElementById('date');
const currentWeatherItemsEl = document.getElementById('current-weather-items');
const timezone = document.getElementById('time-zone');
const countryEl = document.getElementById('country');
const weatherForecastEl = document.getElementById('weather-forecast');
const currentTempEl = document.getElementById('current-temp');


const days = ['Sunday', 'Monday' , 'Tuesday', 'Wednesday', 'Thursday',
'Friday', 'Saturday' ];
const months = ['Jan', 'Feb', 'Mar','Apr', 'May', 'Jun', 'Jul', 'Aug',
'Sept', 'Oct', 'Nov', 'Dec'];

const API_KEY = '7448c803b42d5187e6b81106783eed10';


setInterval(() =>{
     const time = new Date();
     const month = time.getMonth();
     const date = time.getDate();
     const day = time.getDay();
     const hour= time.getHours();
     const hoursIn12HrsFormat = hour >= 13 ? hour %12 : hour;
     const minutes= time.getMinutes();
     const ampm = hour >=12 ? 'PM' : 'AM';

     timeEl.innerHTML = `${hoursIn12HrsFormat}:${minutes} <span id="am-pm">${ampm}</span>`


     dateEl.innerHTML = `${days[day]},${date} ${months[month]}`
},1000);

getWeatherData()
function getWeatherData (){
    navigator.geolocation.getCurrentPosition((success) =>{
        console.log(success);

        let{latitude,longitude} = success.coords;

        fetch('https://api.openweathermap.org/data/2.5/onecall?lat=24.2155795&lon=83.0401774&exclude=hourly,minutely&units=metric&appid=7448c803b42d5187e6b81106783eed10').then(res => res.json()).then(data => {
            console.log(data)
            showWeatherData(data);
        })
    })
}

function showWeatherData(data){
      let{humidity, pressure, sunrise, sunset, wind_speed} = data.current;

      timezone.innerHTML = data.timezone;
      countryEl.innerHTML = data.lat + 'N  ' + data.lon + 'E'
    
      currentWeatherItemsEl.innerHTML =`<div class="weather-items"><div>Humidity</div><div>${humidity}</div></div><div class="weather-items"><div>Pressure</div><div>${pressure}</div></div><div class="weather-items"><div>Wind Speed</div><div>${wind_speed}</div></div><div class="weather-items"><div>Sunrise</div><div>${window.moment(sunrise * 1000).format('HH:mm a')}</div></div><div class="weather-items"><div>Sunset</div><div>${window.moment(sunset * 1000).format('HH:mm a')}</div></div>`;
    

    let otherDayForecast = ''
    data.daily.forEach((day, idx) => {
        if(idx==0)
        {
            currentTempEl.innerHTML =  `
            <img src="http://openweathermap.org/img/wn/${day.weather[0].icon}@4x.png" alt="weather icon" class="w-icon">
            <div class="other">
                <div class="day">${window.moment(day.dt * 1000).format('ddd')}</div>
                <div class="temp">Night - ${day.temp.night}&#176; C</div>
                <div class="temp">Day - ${day.temp.day}&#176; C</div>
            </div> `
        }else{
            otherDayForecast += `
            <div class="weather-forecast-item">
                <div class="day">${window.moment(day.dt * 1000).format('ddd')}</div>
                <img src="http://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png" alt="weather icon" class="w-icon">
                <div class="temp">Night - ${day.temp.night}&#176; C</div>
                <div class="temp">Day - ${day.temp.day}&#176; C</div>  
            </div> `
        }

    })


    weatherForecastEl.innerHTML = otherDayForecast;

}

