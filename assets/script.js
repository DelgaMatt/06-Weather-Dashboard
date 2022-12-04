// WHEN I search for a city
// THEN I am presented with current and future conditions for that city and that city is added to the search history
// WHEN I view current weather conditions for that city
// THEN I am presented with the city name, the date, an icon representation of weather conditions, the temperature, the humidity, and the the wind speed
// WHEN I view future weather conditions for that city
// THEN I am presented with a 5-day forecast that displays the date, an icon representation of weather conditions, the temperature, the wind speed, and the humidity
// WHEN I click on a city in the search history
// THEN I am again presented with current and future conditions for that city

//1. get weather api to function properly
//2. get city weather to display on main card
//3. fix button generation issue//get them to function as search queries
//4. link forecast to/build forcast cards

localStorage.clear();
let history = JSON.parse(window.localStorage.getItem("history")) || [];

var cityHistCont = $(".cityHistoryCont");
var searchButton = $("#search"); ///same as below
//var searchButton = document.getElementById('search');

var date = dayjs().format('dddd, MMMM DD YYYY');
var time = dayjs().format('h:mm:ss');
//var apiURL = "https://api.openweathermap.org/data/2.5/onecall?lat={lat}&lon={lon}&exclude=&appid=25c2936adbc148c96a60f0af93156bc8"; //using lat and long to track weather data

//event listener for button, adding content onto local storage
searchButton.on('click', function (event) {
    event.preventDefault();
    let cityName = document.querySelector("#cityName").value;
        if (cityName === "") {
            return;
        };
    console.log("cityName: ", cityName);
    history.push(cityName);

    window.localStorage.setItem("history", JSON.stringify(history));
    console.log(history);
    getCity(cityName);
    cityHistory();
    
    $("#cityName").val("");
    });

//--------calls to weather API------>
function getCity(cityName) {
    //----- geocoding for lat and lon of city----->
    var geoCityApi = "http://api.openweathermap.org/geo/1.0/direct?q=" + cityName + "&appid=25c2936adbc148c96a60f0af93156bc8";
    console.log(geoCityApi);
    fetch(geoCityApi)
        .then(function (response) {
        return response.json();
        })
        .then(function (data) {

            const lat = data[0].lat;
            console.log(lat);
            const lon = data[0].lon;
            console.log(lon);
            var latlon = lat.toString() + ", " + lon.toString();
            window.localStorage.setItem(cityName, latlon);

            console.log(data);
            console.log(latlon);
            getForecast(lat, lon);
        });
};


function getForecast(lat, lon) {
    var apiURL = "https://api.openweathermap.org/data/2.5/weather?lat=" + lat + "&lon=" + lon + "&units=imperial&appid=25c2936adbc148c96a60f0af93156bc8";
    console.log(apiURL);
    $(".results-panel").addClass("visible");

    fetch(apiURL)
        .then(function(response) {
            return response.json();
        })
        .then(function(data) {
            var name = data.name;
            var icon = data.weather[0].icon + ".png";
            console.log(icon);
            $(".todayCity").text(name);
            $(".todayDate").text(date);
            // $("#icons").attr("src", "http://openweathermap.org/img/w/" + data.weather[0].icon + ".png");
            var tempValue = data.main.temp;
            $(".temp").text("Temperature: " + tempValue + "°F");
            var condition = data.weather[0].main;
            $(".condition").text("Condition: " + condition);
            var humidity = data.main.humidity;
            $(".humidity").text("Humiditidy: " + humidity + "%");
            var wind = data.wind.speed;
            $(".wind").text("Wind Speeds: " + wind + "mph")
        })
};

//creating buttons for every city searched
function cityHistory() {
    for (let index = 0; index < history.length; index++) {
        let historyList = $("<button class=col list-item>").text(history[index]);

        cityHistCont.append(historyList);
    };

    $(".list-item").on("click", function(event) {
        event.preventDefault();
        window.localStorage.getItem(cityName, latlon)
        // getForecast(latlon);
    });


};

// function forcastCards() {

// };