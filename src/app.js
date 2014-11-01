var UI = require('ui');
var ajax = require('ajax');

// Create a Card with title and subtitle
var Vector2 = require('vector2');
var splashWindow = new UI.Window({clear: true});
splashWindow.show();
var cardtitle = new UI.Text({ text:'Weather:', textAlign:'center', font:'GOTHIC_28_BOLD', color:'black',  position: new Vector2(0,0), size: new Vector2(144, 50)});
var cardsubtitle = new UI.Text({ text:'...Fetching...', textAlign:'center', font:'GOTHIC_24_BOLD', color:'black',  position: new Vector2(0, 40), size: new Vector2(144, 100)});
var cardsubtitle2 = new UI.Text({ text:'', textAlign:'center', font:'GOTHIC_24_BOLD', color:'black',  position: new Vector2(0, 100), size: new Vector2(144, 100)});
var cardbody = new UI.Text({ text:'', textAlign:'center', font:'GOTHIC_24', color:'black',  position: new Vector2(0, 125), size: new Vector2(144, 25)});
var rect = new UI.Rect({ size: new Vector2(144, 168) });

splashWindow.add(rect);
var image = new UI.Image({position: new Vector2(62, 80), size: new Vector2(20, 20)});
		splashWindow.add(image);
var cardicon = "";
var TT = new UI.TimeText({ text:'%I:%M', textAlign:'center', font:'BITHAM_42_BOLD', color:'black',  position: new Vector2(0,5), size: new Vector2(144, 168)});
var DT = new UI.TimeText({ text:'%m/%d', textAlign:'center', font:'GOTHIC_14_BOLD', color:'black',  position: new Vector2(5,0), size: new Vector2(72, 168)});
// Display the Card
splashWindow.add(DT);
splashWindow.add(TT);
splashWindow.add(cardtitle);
splashWindow.add(cardsubtitle);
splashWindow.add(cardsubtitle2);
splashWindow.add(cardbody);
// Construct URL
var cityName = '07079';
var URL = 'http://api.openweathermap.org/data/2.5/weather?q=' + cityName;
var coordinates = "";
navigator.geolocation.getCurrentPosition(

        // Location Success
        function (position) {

          // Extract the coordinates.
          coordinates = position.coords;
					URL = 'http://api.openweathermap.org/data/2.5/weather?lat=' + coordinates.latitude + '?long=' + coordinates.longitude;
          });
// Make the request
ajax(
  {
    url: URL,
    type: 'json'
  },
  function(data) {
    // Success!
		splashWindow.remove(cardtitle);
    console.log("Successfully fetched weather data!");

    // Extract data
    var location = data.name;
		var temp = (data.main.temp - 273.15) * 1.8;
    var temperature = Math.round(temp + 32)  + "F";

    // Always upper-case first letter of description
    var description = data.weather[0].description;
    description = description.charAt(0).toUpperCase() + description.substring(1);
		var icon = data.weather[0].icon;

		
    // Show to user
		cardsubtitle.text(" " + temperature + "," );
		cardsubtitle2.text(description);
		cardbody.text("in " + location);
    
				switch(icon){
			case "01d":
				cardicon = "images/clear.png";
				break;
			case "01n":
				cardicon = "images/nt_clear.png";
				break;
			case "02d":
				cardicon = "images/mostlysunny.png";
				break;
			case "02n":
				cardicon = "images/nt_partlycloudy.png";
				break;
			case "03d":
				cardicon = "images/cloudy.png";
				break;
			case "03n":
				cardicon = "images/cloudy.png";
				break;
			case "04d":
				cardicon = "images/cloudy.png";
				break;
			case "04n":
				cardicon = "images/cloudy.png";
				break;
			case "09d":
				cardicon = "images/chancerain.png";
				break;
			case "09n":
				cardicon = "images/chancerain.png";
				break;
			case "10d":
				cardicon = "images/chancerain.png";
				break;
			case "10n":
				cardicon = "images/chancerain.png";
				break;
			case "11d":
				cardicon = "images/chancetstorms.png";
				break;
			case "11n":
				cardicon = "images/chancetstorms.png";
				break;
			case "13d":
				cardicon = "images/chanceflurries.png";
				break;	
			case "13n":
				cardicon = "images/chanceflurries.png";
				break;	
			case "50d":
				cardicon = "images/fog.png";
				break;	
			case "50n":
				cardicon = "images/fog.png";
				break;	
			
		}
		image.image(cardicon);
  },
  function(error) {
    // Failure!
    console.log('Failed fetching weather data: ' + error);
  }
);

