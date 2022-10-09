// select elements from DOM
    // form
    // input


// listen for submit event
    //get city out of input
    // fetch city's weather
        // show weather in card
            //fetch five-day forecast for city
                // show forecast in cards

fetch("https://api.openweathermap.org/data/2.5/weather?q=milwaukee&appid=47a293b2c262948368bb05e085504ccd")
    .then(res => res.json())
    .then(data => console.log(data))