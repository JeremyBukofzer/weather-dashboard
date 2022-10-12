var citySearch = $("#search-form")
var searchHistory = $("#search-history")

var apiKey = "&appid=47a293b2c262948368bb05e085504ccd"
var weatherApi = "https://api.openweathermap.org/data/2.5/weather?q="
var units = "&units=imperial"
var uviApi = "https://api.openweathermap.org/data/2.5/uvi?"
var forecastApi = "https://api.openweathermap.org/data/2.5/onecall?"

let cityName = "milwaukee"

var getWeather = function (cityName) {
    var currentWeatherApi = weatherApi + cityName + apiKey + units;

    fetch(currentWeatherApi).then(function (response) {
        if (response.ok) {
            return response.json(),then(function (response) {
                $("#city-name").html(response.name);
                var todaysDate = response.dt;
                var date = moment.unix(todaysDate).format("MM/DD/YY")
                $("#date-today").html(date);
                var weatherIcon =  "http://openweathermap.org/img/wn/" + response.weather[0].icon + "@2x.png";
                $(current-icon).attr("src", weatherIcon)

                var lat = response.coord.lat;
                var lon = response.coord.lon;

            })
        } else {
            alert("Please provide valid city")
        }
    })
};

var getUvIndex = function (lat, lon) {
    var uvApiUrl = weatherApi + apiKey + "&lat=" + lat + "&lon=" + lon + units;
    
    fetch(uvApiUrl)
    .then(function (response) {
        return response.json;

    })
    .then(function(response ) {
        $("#uv-index").html(response.value)
    })
};

var getForecastData = function (lat,lon) {

    var forecastApi = weatherApi + "&lat=" + lat + "&lon=" + lon + apiKey + units;
    fetch(forecastApi)
    .then(function (response) {
        return response.json();
    })
    .then (function  () {
        for (var i = 1; i < 6; i++) {

            var futuredates = response.daily[i].dt;
            var date = moment.unix(futuredates).format("dddd, MM Do")
            $('#forecast-date' + i).html(date);

            var forecastIcon = "http://openweathermap.org/img/wn/" + response.daily[i].weather[0].icon + "@2x.png";
            $("#forecast-img" + i).html(forecastIcon);
            var forecastTemp = response.daily[i].temp.day;
            $("#temp-day" + i).html(forecastTemp);
            var forecastWind = response.daily[i].wind.speed;
            var forecastHumidity = response.daily[i].humidity;
            $("#huimidity-day" + i).html(forecastHumidity);
        }
    })
};



        


