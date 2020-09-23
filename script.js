$(document).ready(function() {
    for (i = 0; i < 3 ; i++) {
    
        $("#" + i).val(localStorage.getItem(`city${i}`));
        localStorage.removeItem(`city${i}`);
        };
    //setup for query
    //code to add a button element to left hand side of screen
    
     
    var  searchBtn = $("#search");
    searchBtn.on("click", function () {
        var cityName = $("#cityInput").val();
        var cityHistory = [] 
        //code to append city to search history
        // create and visibly show city search history
        var newListItem = $("<li></li>");
        var recall = $("<button></button>").prepend(cityName);
        $("#searchHistory").prepend(newListItem);
        newListItem.prepend(recall);
        cityHistory.push(cityName);
        //Storing search history
        for (i = 0; i < cityHistory.length; i++) {
            localStorage.setItem(`city${i}`, cityName);
        }
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
            tempMax = `Max: ${response.main.temp_max} C  `;
            tempMin = `Min: ${response.main.temp_min} C  `;
            humidity = `Humidity: ${response.main.humidity} % `;
            windSpeed = `Wind Speed: ${response.wind.speed} km/h `;
            feelsLike = Number(response.main.feels_like);

            //feels_Like conversion to an integer

            $("#max").prepend(tempMax);
            $("#min").prepend(tempMin);
            $("#humidity").prepend(humidity);
            $("#windSpeed").prepend(windSpeed);
            //value comparisons inside if conditions using number thresholds

            // temperature below 15
            if (feelsLike < 15) {
                //code to display symbol
                $("#max").append("<i class='far fa-snowflake'></i>");
            // temperature between 16 and 25
            } else if (feelsLike < 25) {
                
                $("#max").append("<i class='fas fa-temperature-low'></i>");
            } else if (feelsLike <= 32) {
                
                $("#max").append("<i class='fas fa-temperature-high'></i>");
            } else if (feelsLike > 32) {
                
                $("#max").append("<i class='far fa-sun'></i>");
            }
            
            // use the feels like paramter for the different conditions temperature 15.1 to 25, 25 to 32 and above 33.

            // humidity conditions, 25%, 25 to 50% 50 to 75% and 76%+ 
            // symbol for clear represents 0 to 33%, cloudy 34 to 68% and overcast = 70%+

            // windSpeed symbol, below 5, 5.1 to 15, 15+



            
           
        });
    });

});
