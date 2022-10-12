// select elements from DOM
    // form
    // input
var cityName = document.getElementById('city-name')
var currentTemp = document.getElementById('temp')
var currentWind = document.getElementById('wind')
var currentHumidity = document.getElementById('humidity')
var currentUvIndex = document.getElementById('uv-index')
var cityInput = document.getElementById('search-city')
var ApiKey = "&appid=47a293b2c262948368bb05e085504ccd"
// listen for submit event
    //get city out of input
    // fetch city's weather
        // show weather in card
            //fetch five-day forecast for city
                // show forecast in cards



var city = "milwaukee"

var renderCityWeather = function(city) {
    event.preventDefault();

    var fetchWeather = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=imperial" + ApiKey

    fetch(fetchWeather).then(function(response) {
        response.json().then(function(data) {
            console.log(data);
        });
    });
};


        


