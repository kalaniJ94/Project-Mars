var planetLinks = document.querySelectorAll(".dropdown-content a");

var retrievedPlanet = localStorage.getItem("planetChosen");
var planetGravity = parseFloat(localStorage.getItem("planetGravity"));
var planetTempInFahrenheit = parseFloat(
  localStorage.getItem("planetTempInFahrenheit")
);
var planetDensity = parseFloat(localStorage.getItem("planetDensity"));
var planetNumberOfMoons = parseInt(
  localStorage.getItem("planetNumberOfMoons"),
  10
);
var planetNameOfMoons = JSON.parse(localStorage.getItem("planetNameOfMoons"));

// testing
console.log(`Object: ${retrievedPlanet}`);
console.log(`Gravity: ${planetGravity}`);
console.log(`Temperature in Fahrenheit: ${planetTempInFahrenheit}`);
console.log(`Density: ${planetDensity}`);
console.log(`Number of Moons: ${planetNumberOfMoons}`);
console.log(`Names of Moons: ${planetNameOfMoons.join(", ")}`);

function kelvinToFahrenheit(K) {
  return (9 / 5) * (K - 273.15) + 32;
}

planetLinks.forEach(function (link) {
  link.addEventListener("click", function (event) {
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

function displayData() {
  // select the ul to append the list items to
  var planetDataEl = document.querySelector("#planet-data");
  // gather local storage elements
  var planet = `Object: ${retrievedPlanet}`;
  var gravity = `Gravity: ${planetGravity}`;
  var avgTemp = `Temperature in Fahrenheit: ${planetTempInFahrenheit}`;
  var density = `Density: ${planetDensity}`;
  var moons = `Number of Moons: ${planetNumberOfMoons}`;
  var moonsArray = `Names of Moons: ${planetNameOfMoons.join(", ")}`;

  // create a new tag for each element
  var displayPlanet = document.createElement("li");
  var displayGravty = document.createElement("li");
  var displayAvgTemp = document.createElement("li");
  var displayDensity = document.createElement("li");
  var displayMoons = document.createElement("li");
  var displayMoonsArray = document.createElement("li");
  
  displayPlanet.textContent = planet;
  displayGravty.textContent = gravity;
  displayAvgTemp.textContent = avgTemp;
  displayDensity.textContent = density;
  displayMoons.textContent = moons;
  displayMoonsArray.textContent = moonsArray;
  
  // append to the html
  planetDataEl.append(displayPlanet, displayGravty, displayAvgTemp, displayDensity, displayMoons, displayMoonsArray);
}

displayData();
