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
            tempMax = response.main.temp_max;
            tempMin = response.main.temp_min;
            humidity = response.main.humidity;
            windSpeed = response.wind.speed;

            $("#max").prepend(`Max: ${tempMax} C`);
            $("#min").prepend(`Min: ${tempMin} C`);
            $("#humidity").prepend(`Humidity: ${humidity}%`);
            $("#windSpeed").prepend(`Wind Speed: ${windSpeed} km/h`);
           
        });
    });

});
