// To do in the readme explain why you have symbols by each weather element and not a pseudolibrary multiconditional if statement partially to keep code clean, partially to avoid delay and wanting to deliver an MVP.

$(document).ready(function() {
    for (i = 0; i < 3 ; i++) {
    
        $("#" + i).val(localStorage.getItem(`city${i}`));
        localStorage.removeItem(`city${i}`);
        var newListItem = $("<li></li>");
        var recall = $("<button></button>").prepend(`city${i}`);
        $("#searchHistory").prepend(newListItem);
        newListItem.prepend(recall);
        cityHistory.push(cityName);
        };
    //setup for query
    //code to add a button element to left hand side of screen
    
    var count = 0;
    var  searchBtn = $("#search");
    searchBtn.on("click", function () {
        count++;
        var cityName = $("#cityInput").val();
        var cityHistory = [] 
        //code to append city to search history
        // create and visibly show city search history
        var newListItem = $("<li></li>");
        var recall = $("<button></button>").prepend(cityName);
        newListItem.attr('id', cityName);
        $("#searchHistory").prepend(newListItem);
        newListItem.prepend(recall);
        cityHistory.push(cityName);

    //Storing search history
    for (i = 0; i < cityHistory.length; i++) {
        localStorage.setItem(`city${i}`, cityName);
    }
        
    //adding recall capability 


    });

    searchBtn.on("click", function () {
        var cityName = $("#cityInput").val(); 
        
        // weather data variables
        var tempMax = "";
        var tempMin = "";
        var humidity = "";
        var windSpeed = "";
        var feelsLike = ""
        // clearing weather data text content
        $("#max").empty();
        $("#min").empty();
        $("#humidity").empty();
        $("#windSpeed").empty();

        //ajax call for weather data
        var queryURL = "http://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&units=metric&appid=e8cee38ca68175caca0582fcfd360426"
        
        $.ajax({
            url: queryURL,
            method: "GET",
        }).then(function(response) {
            console.log(response);
            // code to add and display the temperature, the humidity, the wind speed, and the UV index
            tempMax = `Max: ${response.main.temp_max} C`;
            tempMin = `Min: ${response.main.temp_min} C`;
            humidity = `Humidity: ${response.main.humidity} %`;
            windSpeed = `Wind Speed: ${response.wind.speed} km/h`;
            feelsLike = Number(response.main.feels_like);

            //feels_Like conversion to an integer

            $("#max").prepend(tempMax);
            $("#min").prepend(tempMin);
            $("#humidity").prepend(humidity);
            $("#windSpeed").prepend(windSpeed);
            
            //calling uv index data setup
            var uvLong = response.coord.lon; 
            var uvLat = response.coord.lat;
            var queryURLuv = "http://api.openweathermap.org/data/2.5/uvi?lat=" + uvLat + "&lon=" + uvLong + "&appid=e8cee38ca68175caca0582fcfd36042";
            $.ajax({
                url: queryURLuv,
                method: "GET",
            }).then(function(response) {
                console.log(response);
            })

            //value comparisons inside if conditions using number thresholds
            // use the feels like paramter for the different conditions temperature 15.1 to 25, 25 to 32 and above 33.
            // temperature below 15 has a snowflake symbol
            if (feelsLike < 15) {
                //code to display symbol
                $("#max").append("<i class='far fa-snowflake'></i>");
            // temperature between 16 and 25 has a thermometer low symbol
            } else if (feelsLike < 25) {
                
                $("#max").append("<i class='fas fa-temperature-low'></i>");

            } else if (feelsLike <= 32) {
                // temperature between 25 and 32 has a thermometer low symbol
                $("#max").append("<i class='fas fa-temperature-high'></i>");

            } else if (feelsLike > 32) {
                // temperature above 32 has a sun heat display.
                $("#max").append("<i class='far fa-sun'></i>");
            }

            // humidity conditions, 25%, 25 to 50% 50 to 75% and 76%+ 
            if (response.main.humidity <= 33) {
                //code to display symbol
                $("#humidity").append("<i class='fas fa-tint-slash'></i>")
                
            // humidity below 67%
            } else if (response.main.humidity <= 67) {
                
                $("#humidity").append("<i class='fas fa-tint'></i>");
                
            } else if (humidity <= 100) {
                // umbrella symbol for 68 to 100% humidity
                $("#humidity").append("<i class='fas fa-umbrella'></i>");
            }

            // symbol for clear represents 0 to 33%, cloudy 34 to 68% and overcast = 70%+
            if (response.main.humidity <= 33) {
                //code to display symbol
                $("#humidity").append("<i class='fas fa-sun'></i>")
                
            // humidity below 67%
            } else if (response.main.humidity <= 67) {
                
                $("#humidity").append("<i class='fas fa-cloud-sun'></i>");
                
            } else if (humidity <= 100) {
                // umbrella symbol for 68 to 100% humidity
                $("#humidity").append("<i class='fas fa-cloud'></i>");
            }

            // windSpeed symbol, below 5, 5.1 to 15, 15+
        });
    });
    //same as above except for the other weather days
    searchBtn.on("click", function () {
        var cityName = $("#cityInput").val();
        
        //ajax call for weather data
        var queryURL = "http://api.openweathermap.org/data/2.5/forecast?q=" + cityName + "&units=metric&appid=e8cee38ca68175caca0582fcfd360426"
        
        $.ajax({
            url: queryURL,
            method: "GET",
        }).then(function(response) {
             console.log(response);
        
            // weather data variables
            var tomorrowTempAvg = "";
            var tomorrowHumidity = "";
            var tomorrowWindSpeed = "";
            var tomorrowFeelsLike = "";

            //clearing weather data text content
            $("#tomorrowMax").empty();
            $("#tomorrowMin").empty();
            $("#tomorrowHumidity").empty();
            $("#tomorrowWindSpeed").empty();

            tomorrowTempAvg = `Avg: ${response.list[10].main.temp} C`;
            tomorrowHumidity = `Humidity: ${response.list[10].main.humidity} %`;
            tomorrowWindSpeed = `Wind Speed: ${response.list[10].wind.speed} km/h`;
            tomorrowFeelsLike = Number(response.list[10].main.feels_like);
                
            //feels_Like conversion to an integer
            //adding values to html   
            $("#tomorrowAvg").prepend(tomorrowTempAvg);
            $("#tomorrowHumidity").prepend(tomorrowHumidity);
            $("#tomorrowWindSpeed").prepend(tomorrowWindSpeed);


            //Day Two weather Data
            var dayTwoTempAvg = "";
            var dayTwoHumidity = "";
            var dayTwoWindSpeed = "";
            var dayTwoFeelsLike = "";
            
            // code to add and disp
            // code to add and display the temperature, the humidity, the wind speed, and the UV index
            dayTwoTempAvg = `Avg: ${response.list[18].main.temp} C`;
            dayTwoHumidity = `Humidity: ${response.list[18].main.humidity} %`;
            dayTwoWindSpeed = `Wind Speed: ${response.list[18].wind.speed} km/h`;
            dayTwoFeelsLike = Number(response.list[18].main.feels_like);
                
            //feels_Like conversion to an integer
            //adding values to html   
            $("#dayTwoAvg").prepend(dayTwoTempAvg);
            $("#dayTwoHumidity").prepend(dayTwoHumidity);
            $("#dayTwoWindSpeed").prepend(dayTwoWindSpeed);

            //Day three weather data
            var dayThreeTempAvg = "";
            var dayThreeHumidity = "";
            var dayThreeWindSpeed = "";
            var dayThreeFeelsLike = "";
            
            // code to add and disp
            // code to add and display the temperature, the humidity, the wind speed, and the UV index
            dayThreeTempAvg = `Avg: ${response.list[26].main.temp} C`;
            dayThreeHumidity = `Humidity: ${response.list[26].main.humidity} %`;
            dayThreeWindSpeed = `Wind Speed: ${response.list[26].wind.speed} km/h`;
            dayThreeFeelsLike = Number(response.list[26].main.feels_like);
                
            //feels_Like conversion to an integer
            //adding values to html   
            $("#dayThreeAvg").prepend(dayThreeTempAvg);
            $("#dayThreeHumidity").prepend(dayThreeHumidity);
            $("#dayThreeWindSpeed").prepend(dayThreeWindSpeed);

            //Day four weather data
            var dayFourTempAvg = "";
            var dayFourHumidity = "";
            var dayFourWindSpeed = "";
            var dayFourFeelsLike = "";
            
            // code to add and disp
            // code to add and display the temperature, the humidity, the wind speed, and the UV index
            dayFourTempAvg = `Avg: ${response.list[34].main.temp} C`;
            dayFourHumidity = `Humidity: ${response.list[34].main.humidity} %`;
            dayFourWindSpeed = `Wind Speed: ${response.list[34].wind.speed} km/h`;
            dayFourFeelsLike = Number(response.list[34].main.feels_like);
            
            //feels_Like conversion to an integer
            //adding values to html   
            $("#dayFourAvg").prepend(dayFourTempAvg);
            $("#dayFourHumidity").prepend(dayFourHumidity);
            $("#dayFourWindSpeed").prepend(dayFourWindSpeed);
        })

    });

});
