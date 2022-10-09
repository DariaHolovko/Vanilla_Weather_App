function searchCity(city) {
  let apiKey = "8ca7dd4e61360b90fb66918853670e48";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayTemp);
}

let search = document.querySelector(".searchEngine");
search.addEventListener("submit", getCity);

function getCity(event) {
  event.preventDefault();
  let cityInputElement = document.querySelector("#citySearch");
  searchCity(cityInputElement.value);
}

function getForecast(coordinates) {
  let apiKey = "96ad27349a64ea1dcdfbe6f4d458c085";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}

function formatDay(forecastDay) {
  let date = new Date(forecastDay * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  return days[day];
}

function displayForecast(response) {
  let forecast = response.data.daily;
  console.log(forecast);
  let forecastElement = document.querySelector("#forecast");

  let forecastHTML = `<div class="row">`;
  forecast.forEach(function (forecastDay, index) {
    if (index < 5) {
      forecastHTML =
        forecastHTML +
        `<div class="col-2">
           <div class="forecastDay"> ${formatDay(forecastDay.dt)} </div>
            <img src="http://openweathermap.org/img/wn/${
              forecastDay.weather[0].icon
            }@2x.png" width="36"/>
            <div class="forecastTemperature">
             <span class="forecastTempMax"> ${Math.round(
               forecastDay.temp.max
             )}˚ </span> 
             <span class="forecastTempMin"> ${Math.round(
               forecastDay.temp.min
             )}˚ </span> 
            </div>
          </div>`;
    }
  });
  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

function displayTemp(response) {
  console.log(response.data);
  let cityElement = document.querySelector("#city");
  let tempElement = document.querySelector("#temp");
  let weatherDescriptionElement = document.querySelector("#weatherDescription");
  let humidityElement = document.querySelector("#humidity");
  let windElement = document.querySelector("#wind");
  let feelingElement = document.querySelector("#feeling");
  let dateElement = document.querySelector("#date");
  let iconElement = document.querySelector("#weatherIcon");

  cityElement.innerHTML = response.data.name;
  celsius = response.data.main.temp;
  tempElement.innerHTML = `${Math.round(celsius)}˚`;
  weatherDescriptionElement.innerHTML = response.data.weather[0].description;
  humidityElement.innerHTML = response.data.main.humidity;
  windElement.innerHTML = Math.round(response.data.wind.speed);
  feelingElement.innerHTML = Math.round(response.data.main.feels_like);
  dateElement.innerHTML = getDate(response.data.dt * 1000);

  iconElement.setAttribute(
    "src",
    ` http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );

  getForecast(response.data.coord);
}
function getDate(timestamp) {
  let date = new Date(timestamp);
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[date.getDay()];
  return `${day} ${hours}:${minutes}`;
}

searchCity("Kyiv");
