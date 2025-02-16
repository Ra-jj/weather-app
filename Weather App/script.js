//below consts are placeholders for the API key and the API endpoint URL.
const apiKey = ""; //no API
const apiUrl = "";

const searchBox = document.querySelector(".search input"); //Selects <input> element inside an element with class .search. This is where the user types the city name.
const searchBtn = document.querySelector(".search button"); //Selects <button> inside .search. This is the button that the user clicks to fetch the weather.
const weatherIcon = document.querySelector(".weather-icon"); //Selects <img> element where the weather icon (sun, rain, clouds, etc.) will be displayed.

//below async code takes 'city' as a parameter.
async function checkWeather(city) {
  //async means it will use the await keyword to handle asynchronous operations, like fetching data from an API.
  const response = await fetch(apiUrl + city + `&appid=${apiKey}`); //sends a request to the weather API using fetch()

  //checks if the response status is 404 (Not Found), meaning the city doesn’t exist
  if (response.status == 404) {
    document.querySelector(".error").style.display = "block"; //show error message
    document.querySelector(".weather").style.display = "none"; //hides weather section so incorrect data is not displayed
  } else {
    var data = await response.json(); //stores the resulting object in data

    document.querySelector(".city").innerHTML = data.name; //displays city name
    document.querySelector(".temp").innerHTML =
      Math.round(data.main.temp) + "°c"; //displays temperature
    document.querySelector(".humidity").innerHTML = data.main.humidity + "%"; //displays humidity percentage
    document.querySelector(".wind").innerHTML = data.wind.speed + "km/h"; //displays wind speed

    //"data.weather[0].main" property describes the weather condition) and updates the weatherIcon image accordingly
    if (data.weather[0].main == "Clouds") {
      weatherIcon.src = "clouds.png";
    } else if (data.weather[0].main == "Clear") {
      weatherIcon.src = "clear.png";
    } else if (data.weather[0].main == "Drizzle") {
      weatherIcon.src = "drizzle.png";
    } else if (data.weather[0].main == "Rain") {
      weatherIcon.src = "rain.png";
    } else if (data.weather[0].main == "Mist") {
      weatherIcon.src = "mist.png";
    }

    document.querySelector(".weather").style.display = "block"; //ensures that the .weather section is visible
    document.querySelector(".error").style.display = "none"; //hides the .error message if the request was successful
  }
}

searchBtn.addEventListener("click", () => {
  // when clicked, it calls checkWeather() with the city name entered in searchBox.
  checkWeather(searchBox.value);
});
