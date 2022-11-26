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

var city = "";
var cityList = [];
var cityListEl = $(".city-list-container");
var searchButton = $("#search");

var date = dayjs().format('dddd, MMMM DD YYYY');
var time = dayjs().format('h:mm:ss')

function getApi() {
    var apiURL = "https://api.openweathermap.org/data/2.5/onecall?lat={lat}&lon={lon}&exclude=&appid=25c2936adbc148c96a60f0af93156bc8"
}

//event listener for button, adding content onto local storage
$('#search').on('click', function (event) {
    event.preventDefault();
    
    var city = $(this).parent(".form-outline").siblings(".city-search").val().trim();
    if (city === "") {
        alert("please re enter a valid city name");
        return;
    };
    //adding recently searched city onto cityList array -> will display as buttons
    cityList.push(city);

    localStorage.setItem("city", JSON.stringify(city));
    console.log(cityList);
});

//creating buttons for every city searched
function cityHistory () {
    // cityHistory.empty();
    for (let i = 0; i < cityList.length; index++) {
        $(".city-list-container").append('<button class="list-group-item">' + city)
        
        // var listEl = $('<button>');
        // // listEl.addClass();
        // listEl.text(cityList[i]);

    }
}




// function to list history of cities searched
// var cityListEl = $("#city-list")

// var printCity = function(name) {
//     var listEl = $('<li>');
//     var listDetail = name;
//     listEl.addClass("city-list-item").text(listDetail);
//     listEl.appendChild(cityListEl);
// }