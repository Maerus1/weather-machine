$(function(){
  //cache DOM elements and create new variables
  var change = $(".change");
  var city = $(".city");
  var temp = $(".temp");
  var condition = $(".condition");
  var wind = $(".wind");
  var type = ["metric", " &#8451;", " km/h"];

  //need a reference for the body element
  var body = $("body");

  //ajax settings within a function
  function recall(){
  $.ajax({
    cache: false,
    //prints JSON info to page
    type: 'GET',
    url:"http://api.openweathermap.org/data/2.5/weather?q=" + name[0] + "," + name[1] + "&units=" + type[0] + "&appid=eebd340daf88df9a7e3ea7adfef26b0d",
    success:  function(a) {
      city.html("City: " + a.name);
      temp.html("Temperature: " + a.main.temp + type[1]);
      condition.html("Conditions: " + a.weather[0].description);
      wind.html("Wind: " + a.wind.speed + type[2]);
      console.log(a);

      //change background image based on temperature

      if((type[0] === "metric" && a.main.temp > 20) || (type[0] === "imperial" && a.main.temp > 68)){
        body.css('background-image', 'http://wallpapersmap.com/wp-content/uploads/2013/05/country-summer-desktop-backgrounds.jpg")');
      }
      else if((type[0] === "metric" && a.main.temp < 20 && a.main.temp > 10) || (type[0] === "imperial" && a.main.temp < 68 && a.main.temp > 50)){
        body.css('background-image', 'url("http://wallpapercave.com/wp/gV2vUde.jpg")');
      }
      else if((type[0] === "metric" && a.main.temp < 10 && a.main.temp > 0) || (type[0] === "imperial" && a.main.temp < 50 && a.main.temp > 32)){
        body.css('background-image', 'url("http://pcwallart.com/images/fall-desktop-backgrounds-widescreen-wallpaper-2.jpg")');
      }
      else if((type[0] === "metric" && a.main.temp < 0) || (type[0] === "imperial" && a.main.temp < 32)) {
        body.css('background-image', 'url("https://newevolutiondesigns.com/images/freebies/winter-wallpaper-19.jpg")');
      }
    },
    //just in case something goes wrong
    error: function(){
      console.log("error");
    }
  });
}

  //on click change from imperial to metric
  change.click(function(){
    if(type[0] === "metric"){
      type[0] = "imperial";
      type[1] = " &#8457;";
      type[2] = " mph";

    }
    else if(type[0] === "imperial") {
      type[0] = "metric";
      type[1] = " &#8451;";
      type[2] = " km/h";
    }
    recall();
  });

  //get the current location of the user, approximately, and then get the JSON info for the weather.
  var name = [];
  $.getJSON('http://ipinfo.io', function(data){
    name[0] = data.city;
    name[1] = data.region;
    console.log(data);
    //print out JSON info
    recall(); //getJSON isn't necessarily the first thing that would finish if put at the top, keep that in mind, that's why I call recall here instead of outside, so it waits for the user's location
  });
});
