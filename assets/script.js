var citySearch = $("#search-form");
var searchHistory = $("#search-history");

var citiesList = [];
var maxCityList = 8;

var apiKey = "&appid=47a293b2c262948368bb05e085504ccd";
var weatherApi = "https://api.openweathermap.org/data/2.5/weather?q=";
var units = "&units=imperial";
var uviApi = "https://api.openweathermap.org/data/2.5/uvi?";
var forecastApi = "https://api.openweathermap.org/data/2.5/onecall?";

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
                $("#current-icon").attr("src", weatherIcon)

                $("#temp").html(response.main.temp);
                $("#wind").html(response.wind.speed);
                $("#humidity").html(response.main.humidity);

                var lat = response.coord.lat;
                var lon = response.coord.lon;
                getUvIndex(lat, lon);
                getForecastData(lat, lon);

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
        return response.json();

    })
    .then(function(response ) {
        $("#uv-index").removeClass()
        $("#uv-index").html(response.value);
        if (response.value < 3) {
            $("#uv-index").addClass("p-1 rounded bg-success text-white");
        } else if (response.value < 8) {
            $("#uv-index").addClass("p-1 rounded bg-warning text-white");
        } else {
            $("#uv-index").addClass("p-1 rounded bg-danger text-white");
        }
    });
};

var getForecastData = function (lat,lon) {

    var forecastUrl = forecastApi + "lat=" + lat + "&lon=" + lon + apiKey + units;
    fetch(forecastUrl)
    .then(function (response) {
        return response.json();
    })
    .then (function  (response) {
        for (var i = 1; i < 6; i++) {

            var futuredates = response.daily[i].dt;
            var date = moment.unix(futuredates).format("dddd, MM Do")
            $('#forecast-date' + i).html(date);

            var forecastIcon = "http://openweathermap.org/img/wn/" + response.daily[i].weather[0].icon + "@2x.png";
            $("#forecast-img" + i).html(forecastIcon);
            var forecastTemp = response.daily[i].temp.day;
            $("#temp-day" + i).html(forecastTemp);
            var forecastWind = response.daily[i].wind.speed;
            $("#wind-day" + i).html(forecastWind)
            var forecastHumidity = response.daily[i].humidity;
            $("#humidity-day" + i).html(forecastHumidity);
        }
    })
};

var searchHistoryBtn = function (btnText) {
    var btn = $("<button>").addClass("button-list").text(btnText).attr("type", "submit")
    return btn;
};


var renderSearchHistory = function () {
    citiesList = JSON.parse(localStorage.getItem("weatherInfo"));
    if (citiesList == null) {
        citiesList = [];
    }
    for (var i = 0; i < citiesList.length; i++) {
        var prevCityBtn = searchHistoryBtn(citiesList[i]);
        searchHistory.append(prevCityBtn);
    }
};

var saveCity = function (cityName) {
    var addCity = 0;
    citiesList = JSON.parse(localStorage.getItem("weatherInfo"));
    if (citiesList == null) {
        citiesList = [];
        citiesList.unshift(cityName);
    } else {
        for (var i = 0; i < citiesList.length; i++) {
            if (cityName.toLowerCase() == citiesList[i].toLowerCase()) {
                return addCity;
            }
        }
        if(citiesList.length < maxCityList) {
            citiesList.unshift(cityName);
        } else {
            citiesList.pop();
            citiesList.unshift(cityName)
        }
    }
    localStorage.setItem('weatherInfo', JSON.stringify(citiesList));
    addCity = 1;
    return addCity
};

var renderCityBtn = function (cityName) {
    var savedCity = JSON.parse(localStorage.getItem("weatherInfo"));
    if (savedCity.length == 1) {
        var prevCityBtn = searchHistoryBtn(cityName);
        searchHistory.prepend(prevCityBtn);
    } else {
        for (var i = 1; i < savedCity.length; i++) {
            if (cityName.toLowerCase() == savedCity[i].toLowerCase()) {
                return;
            }
        }
        if (searchHistory[0].childElementCount < maxCityList) {
            var prevCityBtn = searchHistoryBtn(cityName);
        } else {
            searchHistory[0].removeChild(saveCity[0].lastChild);
            var prevCityBtn = searchHistoryBtn(cityName)
        }
        searchHistory.prepend(prevCityBtn)
        $(":button.button-list").on("click", function () {
            buttonClick(event);
        });
    }
};


renderSearchHistory();

var submitCityForm = function (event) {
    event.preventDefault();
    var cityName = $("#search-city").val().trim();
    var addCity = saveCity(cityName);
    getWeather(cityName);
    if (addCity == 1) {
        renderCityBtn(cityName)
    }
};
var buttonClick = function (event) {
    event.preventDefault();
    var cityName = event.target.textContent.trim();
    getWeather(cityName); 
}

$("#search-city-button").on("submit", function() {
    submitCityForm()
});

$(":button.button-list").on("click", function() {
    buttonClick(event);
});




