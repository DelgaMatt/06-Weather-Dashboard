// WHEN I search for a city
// THEN I am presented with current and future conditions for that city and that city is added to the search history
// WHEN I view current weather conditions for that city
// THEN I am presented with the city name, the date, an icon representation of weather conditions, the temperature, the humidity, and the the wind speed
// WHEN I view future weather conditions for that city
// THEN I am presented with a 5-day forecast that displays the date, an icon representation of weather conditions, the temperature, the wind speed, and the humidity
// WHEN I click on a city in the search history
// THEN I am again presented with current and future conditions for that city

//when search button, fetch api data/specific information
//  post specified data onto main card and forcast cards
//list searched city, save searched city and info pulled above onto local history
//

var cities = [];
var searchButton = $("#search");

function getApi() {
    var apiURL = ""
}
// $('.search').on('click', function(event) {
//     event.preventDefault();


// printCity();
// })


// function to list history of cities searched
var cityListEl = $("#city-list")

var printCity = function(name) {
    var listEl = $('<li>');
    var listDetail = name;
    listEl.addClass("city-list-item").text(listDetail);
    listEl.appendChild(cityListEl);
}