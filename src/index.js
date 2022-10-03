let apiKey = "8ca7dd4e61360b90fb66918853670e48";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=Kyiv&appid=${apiKey}&units=metric`;
axios.get(apiUrl).then(displayTemp);
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
  tempElement.innerHTML = `${Math.round(response.data.main.temp)}˚`;
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
