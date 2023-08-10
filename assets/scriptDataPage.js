var planetLinks = document.querySelectorAll('.dropdown-content a');

var retrievedPlanet = localStorage.getItem("planetChosen");
var planetGravity = parseFloat(localStorage.getItem("planetGravity"));
var planetTempInFahrenheit = parseFloat(localStorage.getItem("planetTempInFahrenheit"));
var planetDensity = parseFloat(localStorage.getItem("planetDensity"));
var planetNumberOfMoons = parseInt(localStorage.getItem("planetNumberOfMoons"), 10);
var planetNameOfMoons = JSON.parse(localStorage.getItem("planetNameOfMoons"));



// testing
console.log(`Object: ${retrievedPlanet}`);
console.log(`Gravity: ${planetGravity}`);
console.log(`Temperature in Fahrenheit: ${planetTempInFahrenheit}`);
console.log(`Density: ${planetDensity}`);
console.log(`Number of Moons: ${planetNumberOfMoons}`);
console.log(`Names of Moons: ${planetNameOfMoons.join(', ')}`);


function kelvinToFahrenheit(K) {
  return (9 / 5) * (K - 273.15) + 32;
}

planetLinks.forEach(function(link) {
  link.addEventListener('click', function(event) {
      event.preventDefault(); // Prevent the default of <a> tags

      // Get the planet's name from the text content of the link
      var planetName = event.target.textContent.trim();

      // Call the getPlanetData function and pass the planet's name
      getPlanetData(planetName);
  });
});


// gets the planet information
// this is where we'll want to append the data information
function getPlanetData(planetName) {
  var apiUrl = "https://api.le-systeme-solaire.net/rest/bodies/" + planetName;

  fetch(apiUrl)
    .then(function (response) {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error("Error");
      }
    })
    .then(function (data) {
      console.log(data);
      var planetChosen = data.englishName;
      console.log(planetChosen);
      var planetDensity = data.density;
      // Moons
      var planetNumberOfMoons = 0;
      var planetNameOfMoons = [];

      if (data.moons && Array.isArray(data.moons)) {
        planetNumberOfMoons = data.moons.length; // Get the number of moons
        data.moons.forEach((moon) => {
          planetNameOfMoons.push(moon.moon); // Add the name of each moon to the array
        });
      }
      console.log(planetNumberOfMoons);
      console.log(planetNameOfMoons);

      var planetGravity = data.gravity;
      var planetTempInKelvin = data.avgTemp;
      var planetTempInFahrenheit = Math.round(
        kelvinToFahrenheit(planetTempInKelvin)
      );
      console.log(
        "Average Temp of " + planetName + ": " + planetTempInFahrenheit + "°F"
      );
      console.log(`Density: ${planetDensity}  Gravity: ${planetGravity}`);

    })
    .catch(function (error) {
      console.error(
        "There was an issue with fetching the Planet's data:",
        error
      );
    });
}

function planetData(){
  var infoDisplay = document.querySelector("#textarea");

  var planetNames = ["Moon", "Venus", "Mercury", "Mars", "Jupiter", "Saturn", "Uranus", "Neptune", "Pluto"];
  var planetInfo = ["The Moon, Earth's only natural satellite and the only other place in the Solar System where humans have stepped foot. Likely formed billions of years ago when a large body slammed into the Earth. The Earth has a intertwined relationship with it's 'little sibling', through complicated tidal and gravitational systems.", "Venus is often referred to as Earth's 'twin', due to its similar size and density. Venus' atmosphere is thick and toxic, with an ongoing runaway greenhouse gas effect which renders it the hottest planet in the solar system." , "Mercury, the closest planet to the Sun, enjoys a view of the star that is three times larger and eleven times brighter than here on Earth. It hols the title of Smallest planet in the Solar System, as well as the fastest, with a solar orbit of only 88 days!" , "The last rocky planet in the Solar system, Mars is home to a dusty, cold dessert environment. Emerging evidence, however, paints the planet as once hosting a much warmer and wetter atmosphere. One of the most explored bodies in our Solar System, it is home to two rovers, one lander and even a helicopter!", "By far the largest planet in the Solar System, Jupiter is larger than every other planet combined... twice! It is striped with swirling clouds of ammonia and water, floating in the atmosphere, including the famous Giant red spot, a hundreds year old hurricane the size of Earth." ,"Saturn most famous feature is it's dazzling, complex system of icy rings. Thousands of them ring the planet around it's axis. They are made up of large ice and rock chunks primarily, and a few are even theorized to be capable of supporting life!", "Uranus, besides being the butt of many jokes, is the seventh planet from the Sun. It rotates on a 90 degree axis, causing it to spin 'sideways' It is an ice giant, mostly made up of water, methane and ammonia." , "Neptune is the farthest planet from the sun, and was the first planet to be discovered through mathematical calculation. Not visible to Earth with the naked eye, the planet has been visit only once, by Voyager 2 in 1989." , "Last, but certainly not least, Pluto is the best known of the 'dwarf-planets' which orbit the Sun. Once thought to be a ball of ice, recent flybys have made it's rocky nature plain."];

  for (var i = 0; i < planetNames.length; i++) {
    if (retrievedPlanet === planetNames[i]) {
      infoDisplay.textContent = planetInfo[i];
      break; // Assuming you want to exit the loop after finding a match
    }
  }

};
planetData();