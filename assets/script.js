var nasaApiKey = "AdhU2LA6gNybWHFTtnQ6DdCSS5EfM4pWLhNJWVHK";
var planetQueries = document.querySelectorAll(".dropdown-content a");
var dropDownSelection = document.getElementById('button');
var explanationEl = document.getElementById('explainEL');

function kelvinToFahrenheit(K) {
  return (9 / 5) * (K - 273.15) + 32;
}

planetQueries.forEach(function (planet) {
  planet.addEventListener("click", function (event) {
    event.preventDefault();

    var selectedPlanet = event.target.textContent.trim();
    getPlanetData(selectedPlanet);
    
  });
});

// gets the planet information
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

      //store items in local storage
      
      localStorage.setItem("planetChosen", planetChosen.toString());
      localStorage.setItem("planetGravity", planetGravity.toString());
      localStorage.setItem(
        "planetTempInFahrenheit",
        planetTempInFahrenheit.toString()
      );
      localStorage.setItem("planetDensity", planetDensity.toString());
      localStorage.setItem(
        "planetNumberOfMoons",
        planetNumberOfMoons.toString()
      );
      localStorage.setItem(
        "planetNameOfMoons",
        JSON.stringify(planetNameOfMoons)
      );

      window.location.href = '/dataPage.html'; //take user to new page

    })
    .catch(function (error) {
      console.error(
        "There was an issue with fetching the Planet's data:",
        error
      );
    });
}

// this displays a random space photo
function getNasaPhoto() {
  var photoApi =
    "https://api.nasa.gov/planetary/apod?count=1&api_key=" + nasaApiKey;
  fetch(photoApi)
    .then(function (response) {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error();
      }
    })
    .then(function (data) {
      console.log(data);

      // add text
      var photoInformation = data[0].explanation;
      explanationEl.textContent = photoInformation;

      var dateTaken = data[0].date;
      var dateFormat = dayjs(dateTaken).format("MMMM D, YYYY");
      console.log(dateFormat);

      // Check if date is available and format it
      var dateInfo = dateTaken ? `Date: ${dateFormat}` : "";

      // Check if copyright data is available
      var copyRight = data[0].copyright;
      var copyrightInfo = copyRight ? `Copyright: ${copyRight}` : "";

      var photoTitle = data[0].title;

      var footerInfo = [photoTitle, dateInfo, copyrightInfo]
        .filter(Boolean)
        .join(" | ");

      // Update footer with the combined information
      if (footerInfo) {
        var footerElement = document.querySelector("#photoInfo");
        footerElement.textContent = footerInfo;
      }

      document.body.style.backgroundImage = "url(" + data[0].hdurl + ")";
      document.body.style.backgroundSize = "cover";
      document.body.style.backgroundPosition = "center";
      document.body.style.backgroundRepeat = "no-repeat";
    })
    .catch(function (error) {
      console.error("There was an issue with fetching the NASA photos:", error);
    });
}

getNasaPhoto();
