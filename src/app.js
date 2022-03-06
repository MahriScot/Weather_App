let now = new Date();
let dateToday = document.querySelector("#date-today");
let timeNow = document.querySelector("#current-time");

let days = ["Sun", "Mon", "Tues", "Wed", "Thurs", "Fri", "Sat"];
let day = days[now.getDay()];
let date = now.getDate();
let months = [
  "Jan",
  "Feb",
  "March",
  "April",
  "May",
  "June",
  "July",
  "Aug",
  "Sept",
  "Oct",
  "Nov",
  "Dec",
];
let month = months[now.getMonth()];
let year = now.getFullYear();
let hours = now.getHours();
if (hours === 0) {
  hours = `00`;
} else {
  if (hours < 10) {
    hours = `0${hours}`;
  }
}
let minutes = now.getMinutes();
if (minutes < 10) {
  minutes = `0${minutes}`;
}

dateToday.innerHTML = `${day} ${date} ${month} ${year}`;
timeNow.innerHTML = `${hours}:${minutes}`;

// *******end of MY location current date and time
// XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX

// need to add in a greeting function

// need to change the weather symbol to correspond to report

// need to find out where the future forecasts are

// AS BELOW changing celcius to fahrenheit just loses all my data re: searched location. and it doesn't work anyway...

// function showFahrenheit(event) {
//     event.preventDefault();
//     let tempF = document.querySelector("#temperature-now");
//     let temperature = `${Math.round(tempC * 9) / 5 + 32}`;
//     tempF.innerHTML = temperature;
//     }

//   let tempF = document.querySelector("#temperature-f");
//   tempF.addEventListener("click", showFahrenheit);

//   function showCelcius(event) {
//     event.preventDefault();
//     let tempC = document.querySelector("#temperature-now");
//     tempC.innerHTML = Math.round(response.data.main.temp;
//   }

//   let tempC = document.querySelector("#temperature-c");
//   tempC.addEventListener("click", showCelcius);

function displayWeatherCondition(response) {
  document.querySelector("#searched-location").innerHTML = response.data.name;
  document.querySelector("#temperature-now").innerHTML = Math.round(
    response.data.main.temp
  );
  document.querySelector("#humidity").innerHTML =
    response.data.main.humidity + "%";
  document.querySelector("#wind-speed").innerHTML =
    Math.round(response.data.wind.speed) + "km/h";
  document.querySelector("#description").innerHTML =
    response.data.weather[0].description;
  document.querySelector("#min-temp").innerHTML = Math.round(
    response.data.main.temp_min
  );
  document.querySelector("#max-temp").innerHTML = Math.round(
    response.data.main.temp_max
  );
}

function searchCity(city) {
  let apiKey = "1cea906f8f3ab268b1c4225a33a9637a";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayWeatherCondition);
}

function handleSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#search-text-input").value;
  searchCity(city);
}

function searchLocation(position) {
  let apiKey = "1cea906f8f3ab268b1c4225a33a9637a";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(displayWeatherCondition);
}

function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}

function convertToFahrenheit(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature-now");
  temperatureElement.innerHTML = 66;
}

function convertToCelsius(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature-now");
  temperatureElement.innerHTML = 19;
}

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", handleSubmit);

let currentLocationButton = document.querySelector("#current-location-button");
currentLocationButton.addEventListener("click", getCurrentLocation);

searchCity("Glasgow");
