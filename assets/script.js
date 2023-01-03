let searchHistory = []
let lastCitySearched = ""

let getCityWeather = function(city) {

    let apiUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=47a293b2c262948368bb05e085504ccd&units=imperial"

    fetch(apiUrl)

    .then(function(response) {
        if (response.ok) {
            response.json().then(function(data) {
                displayWeather(data);
            });
        } else {
            alert("Error: " + response.statusText);
        }
    })

    .catch(function(error) {
        alert("OpenWeather not responding");
    })
};

let searchSubmitHandler = function(event) {
    event.preventDefault();

    let cityName = $("#search-city").val().trim();

    if(cityName) {
        getCityWeather(cityName);

        $("#search-city").val("");
    } else {
        alert("Please enter the name of a city");
    }
};

let displayWeather = function(weatherData) {

    $("#city-name").text(weatherData.name + " (" + dayjs(weatherData.dt * 1000).format("MM/DD/YYYY") + ") ").append(`<img src="https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png"></img>`);
    $("#temp").text("Temperature: " + weatherData.main.temp.toFixed(1) + "°F");
    $("#wind").text("Wind Speed: " + weatherData.wind.speed.toFixed(1) + "mph");
    $("#humidity").text("Humidity: " + weatherData.main.humidity + "%");

    fetch
}