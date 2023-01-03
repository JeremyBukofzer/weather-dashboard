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

    let cityName = $("#search-city")
}