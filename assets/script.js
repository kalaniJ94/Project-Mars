var marsApiKey = "AdhU2LA6gNybWHFTtnQ6DdCSS5EfM4pWLhNJWVHK";

function getMarsData() {
  
  var apiUrl = "https://api.nasa.gov/insight_weather/?api_key=" + marsApiKey + "&feedtype=json&ver=1.0";

  fetch(apiUrl)
  .then(function (response) {
    if (response.ok) {
      return response.json();
    } else {
      throw new Error('Error: ' + response.statusText);
    }
  })
  .then(function (data) {
    console.log(data);
  })
  .catch(function (error) {
    console.error('There was an issue with fetching the Mars data:', error);
  });
}

getMarsData();