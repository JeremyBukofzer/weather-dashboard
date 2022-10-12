var citySearched = $("#search-form")
var searchHistory = $("#search-history")

var apiKey = "&appid=47a293b2c262948368bb05e085504ccd"
var weatherApi = "https://api.openweathermap.org/data/2.5/weather?q="
var units = "&units=imperial"
var uviApi = "https://api.openweathermap.org/data/2.5/uvi?"
var forecastApi = "https://api.openweathermap.org/data/2.5/onecall?"

var getWeather = function (cityName) {
    var currentWeatherApi = weatherApi + cityName + apiKey + units;

    fetch(currentWeatherApi).then(function (response) {
        if (response.ok) {
            return response.json(),then(function (response) {
                $("#city-name").html(response.name);
                var todaysDate = response.dt;
                var date = moment.unix(todaysDate).format("MM/DD/YY")
                $("#date-today").html(date);
                var weatherIcon =  "http://openweathermap.org/img/wn/" +
                response.weather[0].icon +
                "@2x.png";
                $(current-icon).attr("src", weatherIcon)

            })
        } else {
            alert("Please provide valid city")
        }
    })
}


        


