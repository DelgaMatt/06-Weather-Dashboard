const history = JSON.parse(localStorage.getItem("history")) || [];
const iconUrl = "http://openweathermap.org/img/w/";
const cityHistCont = $("#cityHistoryCont");
const searchButton = $("#search");

const date = dayjs().format('dddd, MMMM DD YYYY');

//event listener for button, adding content onto local storage
searchButton.on('click', function (event) {
    event.preventDefault();
    let cityName = document.querySelector("#cityName").value;
        if (cityName === "") {
            return;
        };
        //method to check if the cityName is already within the array
        if (!history.includes(cityName)) {
        history.push(cityName);
        window.localStorage.setItem("history", JSON.stringify(history));
        cityHistory();
        }
    
    getCity(cityName);  
    $("#cityName").val("");
    console.log(history);
    console.log("cityName: ", cityName);
    console.log(history);
    });

//--------calls to weather API------>
function getCity(cityName) {
    //----- geocoding for lat and lon of city----->
    let geoCityApi = "http://api.openweathermap.org/geo/1.0/direct?q=" + cityName + "&appid=25c2936adbc148c96a60f0af93156bc8";
    console.log(geoCityApi);
    fetch(geoCityApi)
        .then(function (response) {
        // console.log(response);
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
            weatherNow (lat, lon);
        });
};

//using the lat and lon of city to obtain weather data
function weatherNow(lat, lon) {
    let apiURL = "https://api.openweathermap.org/data/2.5/weather?lat=" + lat + "&lon=" + lon + "&units=imperial&appid=25c2936adbc148c96a60f0af93156bc8";
    console.log(apiURL);


    $(".results-panel").addClass("visible");
    //api to get current weather data
    fetch(apiURL)
        .then(function(response) {
            return response.json();
        })
        .then(function(data) {
            let name = data.name;
            let iconcode = data.weather[0].icon;
            
            
            console.log(iconcode);

            $(".todayCity").text(name);
            $(".todayDate").text(date);

            $("#wicon").attr("src", iconUrl + iconcode + ".png"); 

            var tempValue = data.main.temp;
            $(".temp").text("Temperature: " + tempValue + "°F");
            var condition = data.weather[0].main;
            $(".condition").text("Condition: " + condition);
            var humidity = data.main.humidity;
            $(".humidity").text("Humiditidy: " + humidity + "%");
            var wind = data.wind.speed;
            $(".wind").text("Wind Speeds: " + wind + "mph");
    })

    const forcastApi = "https://api.openweathermap.org/data/2.5/forecast?lat=" + lat + "&lon=" + lon + "&units=imperial&appid=25c2936adbc148c96a60f0af93156bc8";
    console.log(forcastApi);
    //api to get future weather data
    fetch(forcastApi)
        .then(function(response) {
            return response.json();
        })

        .then(function(data) {
            $(".forcasthead").text("5 Day Forcast");

            let num = 1;
            for (let index = 0; index < data.list.length; index++) {
                if(data.list[index].dt_txt.indexOf("15:00:00") !== -1) {
                $("#day" + num + "date").text(dayjs().add(num, 'day').format("M/D/YYYY"));
                
                const iconcode = data.list[index].weather[0].icon;
                $("#day" + num + "icon").attr("src", iconUrl + iconcode + ".png");
                // console.log(iconcode);
                // console.log(iconUrl)

                const temp = data.list[index].main.temp;
                $("#day" + num + "temp").text("Temperature: " + temp + "°F");
                // console.log(temp);

                const humid = data.list[index].main.humidity;
                $("#day" + num + "humidity").text("Humidity: " + humid + "%");

                const wind = data.list[index].wind.speed;
                $("#day" + num + "wind").text("Wind Speeds: " + wind + "mph");
                // console.log(wind);

            num++;
                }}
        })    
};

function cityHistory() {
    cityHistCont.html("");
    for (let index = 0; index < history.length; index++) {
        let historyList = $(`<button id=${history[index]} class="mt-1">`).text(history[index]);
        cityHistCont.append(historyList);
      
        $(`#${history[index]}`).on("click", function (event) {
        event.preventDefault();
        let cityName = $(this).text();
        console.log("clicked " + this.textContent);
        getCity(cityName);
        }
      );
    };
};
 cityHistory();