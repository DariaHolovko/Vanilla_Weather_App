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

function convertToFahrenheit(event) {
  event.preventDefault();
  let fahrenheitTemperature = (celsius * 9) / 5 + 32;
  let convertedTemp = document.querySelector("#temp");
  convertedTemp.innerHTML = `${Math.round(fahrenheitTemperature)}˚`;
  fahrenheitButton.classList.add("active");
  fahrenheitButton.classList.remove("inactive");
  celsiusButton.classList.add("inactive");
  celsiusButton.classList.remove("active");
}

function convertToCelsius(event) {
  event.preventDefault();
  let celsiusconvertedTemp = document.querySelector("#temp");
  celsiusconvertedTemp.innerHTML = `${Math.round(celsius)}˚`;
  fahrenheitButton.classList.add("inactive");
  fahrenheitButton.classList.remove("active");
  celsiusButton.classList.add("active");
  celsiusButton.classList.remove("inactive");
}

function displayForecast() {
  let forecastElement = document.querySelector("#forecast");
  let forecastHTML = `<div class="row">`;
  let days = ["Sat", "Sun", "Mon", "Tue", "Wed"];
  days.forEach(function (day) {
    forecastHTML =
      forecastHTML +
      `<div class="col-2">
           <div class="forecastDay"> ${day} </div>
            <img src="http://openweathermap.org/img/wn/01n@2x.png" width="36"/>
            <div class="forecastTemperature">
             <span class="forecastTempMax"> 18˚ </span> 
             <span class="forecastTempMin"> 12˚ </span> 
            </div>
          </div>`;
  });
  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

searchCity("Kyiv");

let celsius = null;

displayForecast();

let fahrenheitButton = document.querySelector("#fahrenheit");
fahrenheitButton.addEventListener("click", convertToFahrenheit);

let celsiusButton = document.querySelector("#celsius");
celsiusButton.addEventListener("click", convertToCelsius);
