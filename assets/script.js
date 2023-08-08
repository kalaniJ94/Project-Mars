var nasaApiKey = "AdhU2LA6gNybWHFTtnQ6DdCSS5EfM4pWLhNJWVHK";

function kelvinToFahrenheit(K) {
  return (9/5) * (K - 273.15) + 32;
}

function getMarsData() {
  
  var apiUrl = "https://api.le-systeme-solaire.net/rest/bodies/mars";

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
    var marsTempInKelvin = data.avgTemp;
    var marsTempInFahrenheit = Math.round(kelvinToFahrenheit(marsTempInKelvin));

    console.log("Average Temp of Mars: " +marsTempInFahrenheit + "°F");

  })
  .catch(function (error) {
    console.error("There was an issue with fetching the Planet's data:", error);
  });
}



function getNasaPhoto(){
  var photoApi = "https://api.nasa.gov/planetary/apod?api_key=" + nasaApiKey;
  fetch(photoApi)
  .then(function (response) {
    if (response.ok) {
      return response.json();
    } else {
      throw new Error('Error');
    }
  })
  .then(function (data) {
    console.log(data.hdurl);

  })
  .catch(function (error) {
    console.error("There was an issue with fetching the NASA photos:", error);
  });
}



getMarsData();
getNasaPhoto();