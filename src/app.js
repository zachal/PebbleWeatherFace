var UI = require('ui');
var ajax = require('ajax');

// Create a Card with title and subtitle
var card = new UI.Card({
  title:'Weather',
  subtitle:'Fetching...'
});

// Display the Card
card.show();

// Construct URL
var cityName = '07079';
var URL = 'http://api.openweathermap.org/data/2.5/weather?q=' + cityName;

// Make the request
ajax(
  {
    url: URL,
    type: 'json'
  },
  function(data) {
    // Success!
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
    card.subtitle(location + ", " + temperature);
    card.body(description);
				switch(icon){
			case "01d":
				card.icon = "images/clear.png";
				break;
			case "01n":
				card.icon = "images/nt_clear.png";
				break;
			case "02d":
				card.icon = "images/mostlysunny.png";
				break;
			case "02n":
				card.icon = "images/nt_partlycloudy.png";
				break;
			case "03d":
				card.icon = "images/cloudy.png";
				break;
			case "03n":
				card.icon = "images/cloudy.png";
				break;
			case "04d":
				card.icon = "images/cloudy.png";
				break;
			case "04n":
				card.icon = "images/cloudy.png";
				break;
			case "09d":
				card.icon = "images/chancerain.png";
				break;
			case "09n":
				card.icon = "images/chancerain.png";
				break;
			case "10d":
				card.icon = "images/chancerain.png";
				break;
			case "10n":
				card.icon = "images/chancerain.png";
				break;
			case "11d":
				card.icon = "images/chancetstorms.png";
				break;
			case "11n":
				card.icon = "images/chancetstorms.png";
				break;
			case "13d":
				card.icon = "images/chanceflurries.png";
				break;	
			case "13n":
				card.icon = "images/chanceflurries.png";
				break;	
			case "50d":
				card.icon = "images/fog.png";
				break;	
			case "50n":
				card.icon = "images/fog.png";
				break;	
			
		}
  },
  function(error) {
    // Failure!
    console.log('Failed fetching weather data: ' + error);
  }
);

