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
  cityElement.innerHTML = response.data.name;
  tempElement.innerHTML = `${Math.round(response.data.main.temp)}˚`;
  weatherDescriptionElement.innerHTML = response.data.weather[0].description;
  humidityElement.innerHTML = response.data.main.humidity;
  windElement.innerHTML = response.data.wind.speed;
  feelingElement.innerHTML = Math.round(response.data.main.feels_like);
}
