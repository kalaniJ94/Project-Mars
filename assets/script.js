var nasaApiKey = "AdhU2LA6gNybWHFTtnQ6DdCSS5EfM4pWLhNJWVHK";
var mainDropDown = document.querySelector('.drop-button');
var planetQueries = document.querySelectorAll('.dropdown-content a');

function kelvinToFahrenheit(K) {
  return (9/5) * (K - 273.15) + 32;
}

planetQueries.forEach(function(planet) {
    planet.addEventListener('click', function(event) {
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
            throw new Error('Error');
        }
    })
    .then(function (data) {
        console.log(data);
        var planetDensity = data.density;
        // moons will be more complicated.
        // var planetNumberOfMoons = data.moons;
        // var planetNameOfMoons = data.moons.moon;
        var planetGravity = data.gravity;
        var planetTempInKelvin = data.avgTemp;
        var planetTempInFahrenheit = Math.round(kelvinToFahrenheit(planetTempInKelvin));
        console.log("Average Temp of " + planetName + ": " + planetTempInFahrenheit + "°F");
        console.log(`Density: ${planetDensity}  Gravity: ${planetGravity}`);
    })
    .catch(function (error) {
        console.error("There was an issue with fetching the Planet's data:", error);
    });
}


// this displays a random space photo
function getNasaPhoto(){
  var photoApi = "https://api.nasa.gov/planetary/apod?count=1&api_key=" + nasaApiKey;
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
    // sets the background of the page to image gathered
    document.body.style.backgroundImage = 'url(' + data[0].hdurl + ')';
    document.body.style.backgroundSize = 'cover'; 
    document.body.style.backgroundPosition = 'center';  
    document.body.style.backgroundRepeat = 'no-repeat';  

  })
  .catch(function (error) {
    console.error("There was an issue with fetching the NASA photos:", error);
  });
}


getNasaPhoto();