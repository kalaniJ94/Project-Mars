var planetLinks = document.querySelectorAll(".dropdown-content a");
var planetDataEl = document.getElementById('planet-data');
var planetImageEl = document.querySelector("#inputPlanet");

//vars for modals
var infoDisplay = document.querySelector("#textarea");
var nameDisplay = document.querySelector("#nameText");
var factDisplay = document.querySelector("#factText");
var historyDisplay = document.querySelector("#historyText");


var storedRetrievedPlanet = localStorage.getItem("planetChosen");
var storedPlanetGravity = parseFloat(localStorage.getItem("planetGravity"));
var storedPlanetTempInFahrenheit = parseFloat(
  localStorage.getItem("planetTempInFahrenheit")
);
var storedPlanetDensity = parseFloat(localStorage.getItem("planetDensity"));
var storedPlanetNumberOfMoons = parseInt(
  localStorage.getItem("planetNumberOfMoons"),
  10
);
var storedPlanetNameOfMoons = JSON.parse(localStorage.getItem("planetNameOfMoons"));

var planetNames = [
  "Moon",
  "Venus",
  "Mercury",
  "Mars",
  "Jupiter",
  "Saturn",
  "Uranus",
  "Neptune",
  "Pluto",
];
var planetInfo = [
  "The Moon, Earth's only natural satellite and the only other place in the Solar System where humans have stepped foot. Likely formed billions of years ago when a large body slammed into the Earth. The Earth has a intertwined relationship with it's 'little sibling', through complicated tidal and gravitational systems.",
  "Venus is often referred to as Earth's 'twin', due to its similar size and density. Venus' atmosphere is thick and toxic, with an ongoing runaway greenhouse gas effect which renders it the hottest planet in the solar system.",
  "Mercury, the closest planet to the Sun, enjoys a view of the star that is three times larger and eleven times brighter than here on Earth. It hols the title of Smallest planet in the Solar System, as well as the fastest, with a solar orbit of only 88 days!",
  "The last rocky planet in the Solar system, Mars is home to a dusty, cold dessert environment. Emerging evidence, however, paints the planet as once hosting a much warmer and wetter atmosphere. One of the most explored bodies in our Solar System, it is home to two rovers, one lander and even a helicopter!",
  "By far the largest planet in the Solar System, Jupiter is larger than every other planet combined... twice! It is striped with swirling clouds of ammonia and water, floating in the atmosphere, including the famous Giant red spot, a hundreds year old hurricane the size of Earth.",
  "Saturn most famous feature is it's dazzling, complex system of icy rings. Thousands of them ring the planet around it's axis. They are made up of large ice and rock chunks primarily, and a few are even theorized to be capable of supporting life!",
  "Uranus, besides being the butt of many jokes, is the seventh planet from the Sun. It rotates on a 90 degree axis, causing it to spin 'sideways' It is an ice giant, mostly made up of water, methane and ammonia.",
  "Neptune is the farthest planet from the sun, and was the first planet to be discovered through mathematical calculation. Not visible to Earth with the naked eye, the planet has been visit only once, by Voyager 2 in 1989.",
  "Last, but certainly not least, Pluto is the best known of the 'dwarf-planets' which orbit the Sun. Once thought to be a ball of ice, recent flybys have made it's rocky nature plain.",
];

var factInfo = ["Moon Fact", "Venus Fact", "Mercury Fact", "Mars Fact", "Jupiter Fact", "Saturn Fact", "Uranus Fact", "Neptune Fact", "Pluto Fact"];
var historyInfo = ["Moon History", "Venus History", "Mercury History", "Mars History", "Jupiter History", "Saturn History", "Uranus History", "Neptune History", "Pluto History"];
var nameInfo = ["Moon Name", "Venus Name", "Mercury Name", "Mars Name", "Jupiter Name", "Saturn Name", "Uranus Name", "Neptune Name", "Pluto Name"];
//tabbed modal
var tabLink = document.getElementsByClassName("tabLink");

// testing
// console.log(`Object: ${retrievedPlanet}`);
// console.log(`Gravity: ${planetGravity}`);
// console.log(`Temperature in Fahrenheit: ${planetTempInFahrenheit}`);
// console.log(`Density: ${planetDensity}`);
// console.log(`Number of Moons: ${planetNumberOfMoons}`);
// console.log(`Names of Moons: ${planetNameOfMoons.join(", ")}`);

function kelvinToFahrenheit(K) {
  return (9 / 5) * (K - 273.15) + 32;
}

function clearData() {
  planetDataEl.textContent = "";
  planetImageEl.textContent = "";
  planetInfo.textContent = "";
}

// Data from Local Storage
function displayData() {
  // select the ul to append the list items to

  // gather local storage elements
  var planet = `Object: ${storedRetrievedPlanet}`;
  var gravity = `Gravity: ${storedPlanetGravity} m/s2`;
  var avgTemp = `Temperature in Fahrenheit: ${storedPlanetTempInFahrenheit}°F`;
  var density = `Density: ${storedPlanetDensity} gm/cm3`;
  var moons = `Number of Moons: ${storedPlanetNumberOfMoons}`;
  var moonsArray = `Names of Moons: ${storedPlanetNameOfMoons.join(", ")} `;

  // create a new tag for each element
  var displayPlanet = document.createElement("li");
  var displayGravity = document.createElement("li");
  var displayAvgTemp = document.createElement("li");
  var displayDensity = document.createElement("li");
  var displayMoons = document.createElement("li");
  var displayMoonsArray = document.createElement("li");

  displayPlanet.textContent = planet;
  displayGravity.textContent = gravity;
  displayAvgTemp.textContent = avgTemp;
  displayDensity.textContent = density;
  displayMoons.textContent = `Number of Moons: ${storedPlanetNumberOfMoons}`;
  if (storedPlanetNumberOfMoons > 0) {
    displayMoonsArray.textContent = storedPlanetNameOfMoons;
  }

  // append to the html
  planetDataEl.append(
    displayPlanet,
    displayGravity,
    displayAvgTemp,
    displayDensity,
    displayMoons,
    displayMoonsArray
  );
}

function displayImage() {


  // gather object
  var object = storedRetrievedPlanet.toLowerCase();
  // create element and img src
  var displayPlanetImg = document.createElement("img");
  displayPlanetImg.src = `./assets/images/${object}.png`;
  displayPlanetImg.setAttribute("id", "imgCtn");


  // append
  planetImageEl.append(displayPlanetImg);
}

function openTab(evt, cityName) {
  var i, x, tabLinks;
  x = document.getElementsByClassName("tab");
  for (i = 0; i < x.length; i++) {
    x[i].style.display = "none";
  }
  var tabLinks = document.getElementsByClassName("tabLink");
  for (i = 0; i < x.length; i++) {
    tabLinks[i].classList.remove("w3-light-grey");
  }
  document.getElementById(cityName).style.display = "block";
  evt.currentTarget.classList.add("w3-light-grey");
}

function planetData() {

  for (var i = 0; i < planetNames.length; i++) {
    if (storedRetrievedPlanet === planetNames[i]) {
      infoDisplay.textContent = planetInfo[i];
      break;
    }
  }
}

planetData();
displayImage();
displayData();

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
      // console.log(data);

      // Populate new information
      var planetChosen = data.englishName;
      var planetDensity = data.density;
      var planetNumberOfMoons = 0;
      var planetNameOfMoons = [];

      if (data.moons && Array.isArray(data.moons)) {
        planetNumberOfMoons = data.moons.length; // Get the number of moons
        data.moons.forEach((moon) => {
          planetNameOfMoons.push(moon.moon); // Add the name of each moon to the array
        });
      }

      var planetGravity = data.gravity;
      var planetTempInKelvin = data.avgTemp;
      var planetTempInFahrenheit = Math.round(
        kelvinToFahrenheit(planetTempInKelvin)
      );

      // Populate the fetched data into list items
      var displayPlanet2 = document.createElement("li");
      var displayGravity2 = document.createElement("li");
      var displayAvgTemp2 = document.createElement("li");
      var displayDensity2 = document.createElement("li");
      var displayMoons2 = document.createElement("li");
      var displayMoonsArray2 = document.createElement("li");

      displayPlanet2.textContent = `Object: ${planetChosen}`;
      displayGravity2.textContent = `Gravity: ${planetGravity} m/s2`;
      displayAvgTemp2.textContent = `Temperature in Fahrenheit: ${planetTempInFahrenheit}°F`;
      displayDensity2.textContent = `Density: ${planetDensity} gm/cm3`;
      displayMoons2.textContent = `Number of Moons: ${planetNumberOfMoons}`;
      if (planetNumberOfMoons > 0) {
        displayMoonsArray2.textContent = `Names of Moons: ${planetNameOfMoons.join(", ")}`;
      }

      // console.log(displayDensity2);

      // Append these list items to planetDataEl2
      planetDataEl.append(displayPlanet2, displayGravity2, displayAvgTemp2, displayDensity2, displayMoons2, displayMoonsArray2);


      // Append the image based on the planet's name
      var planetImg = document.createElement("img");
      planetImg.src = `./assets/images/${planetName.toLowerCase()}.png`;
      planetImageEl.appendChild(planetImg);
      console.log('hello!?', planetDataEl)

      // Append short info blurb based on planet's name
      for (var i = 0; i < planetNames.length; i++) {
        if (planetChosen === planetNames[i]) {
          infoDisplay.textContent = planetInfo[i];
          nameDisplay.textContent = nameInfo[i];
          factDisplay.textContent = factInfo[i];
          historyDisplay.textContent = historyInfo[i];
          console.log(nameInfo);
          break;
        }
      }
    })
    .catch(function (error) {
      console.error(
        "There was an issue with fetching the Planet's data:",
        error
      );
    });
}

planetLinks.forEach(function (link) {
  link.addEventListener("click", function (event) {
    event.preventDefault(); // Prevent the default of <a> tags
    clearData();
    // Get the planet's name from the text content of the link
    var planetName = event.target.textContent.trim();

    // Call the getPlanetData function and pass the planet's name
    console.log("new planet", planetDataEl)
    getPlanetData(planetName);
  });
});