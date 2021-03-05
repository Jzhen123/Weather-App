let button = document.getElementById('btn'); // Stores my button from Bootstrap

button.addEventListener('click', function () { // Event listner for fetching the Weather API
    var key = '4ba1c67855b819ecc7cdb88965802ade';
    fetch('https://api.openweathermap.org/data/2.5/weather?zip=' + document.getElementById('inputZip').value + '&appid=' + key)
        .then(function (resp) {
            if (!resp.ok) {
                // make the promise be rejected if we didn't get a 2xx response
                throw new Error("Zip Code Invalid")
            } else {
                return resp.json()
            }
        }) // Convert data to json
        .then(function (data) {
            document.getElementById('inputZip').value = "";
            getDetails(data);
        })
        .catch(function (error) {
             alert(error); // Alerts user "Zip Code is Inavlid" if they enter something invalid
        });
})


// Function that uses the json and .innerHTML to track 6 weather elements
function getDetails(d) {
    var celcius = Math.round(parseFloat(d.main.temp) - 273.15); // Converts Kelvin to Celcius
    var fahrenheit = Math.round(((parseFloat(d.main.temp) - 273.15) * 1.8) + 32); // Converts Kelvin to Fahrenheit


    document.getElementById('city').innerHTML = d.name; // City Name
    document.getElementById('kelvin').innerHTML = Math.floor(d.main.temp) + " &degK"; // Degrees Kelvin
    document.getElementById('celcius').innerHTML = celcius + " &degC"; // Degrees Celcius
    document.getElementById('fahrenheit').innerHTML = fahrenheit + " &degF"; // Degrees Fahreheit
    document.getElementById('condition').innerHTML = d.weather[0].description; // Current weather condition
    document.getElementById("pic").src="http://openweathermap.org/img/wn/" + d.weather[0].icon + "@2x.png"; // Icon of Weather
}

