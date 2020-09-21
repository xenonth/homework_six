$( document ).ready(function() {
    //setup for query
    
     
    var  searchBtn = $("#search");
    searchBtn.on("click", function () {
        var cityName = $("#cityInput").val();  
        console.log(cityName)   
    });
        //ajax call
        //retriving weather Data from the following
        //var queryURL = "http:api.openweathermap.org/data/2.5/weather?q=" + cityName + "&appid=e8cee38ca68175caca0582fcfd360426"
        //$.ajax({
            //url: queryURL,
            //method: "GET"
        //})
      
        //.then(function(response) {
            // console.log(response);
        //})
});
