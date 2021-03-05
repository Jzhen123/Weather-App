let button = document.getElementById('btn');

button.addEventListener('click', function () {
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
            console.log(data);
            document.getElementById('inputZip').value = "";
            getDetails(data);
        })
        .catch(function (error) {
            // alert(error);
        });
})



function getDetails(d) {
    var celcius = Math.round(parseFloat(d.main.temp) - 273.15);
    var fahrenheit = Math.round(((parseFloat(d.main.temp) - 273.15) * 1.8) + 32);


    document.getElementById('city').innerHTML = d.name;
    document.getElementById('kelvin').innerHTML = d.main.temp + " K";
    document.getElementById('celcius').innerHTML = celcius + " C";
    document.getElementById('fahrenheit').innerHTML = fahrenheit + " F";
    document.getElementById('condition').innerHTML = d.weather[0].description;
    document.getElementById("pic").src="http://openweathermap.org/img/wn/" + d.weather[0].icon + "@2x.png";
}

