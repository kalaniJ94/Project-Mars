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