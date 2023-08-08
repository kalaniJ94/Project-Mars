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
    document.body.style.backgroundImage = 'url(' + data[0].hdurl + ')';
    document.body.style.backgroundSize = 'cover'; 
    document.body.style.backgroundPosition = 'center';  
    document.body.style.backgroundRepeat = 'no-repeat';  

  })
  .catch(function (error) {
    console.error("There was an issue with fetching the NASA photos:", error);
  });
}



getMarsData();
getNasaPhoto();