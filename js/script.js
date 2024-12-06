/* 
* Constants - creating constants will increase re-usability
* and maintainability of the code. 
*/
const username = 'sanaali';
const key = '1ba70ac989c045888d7210602241011&q=';
const coordinates = {
    north: '44.1',
    south: '-9.9',
    east: '-22.4',
    west: '55.2'
};
const coordinatesString = Object.entries(coordinates).map(([dir, coord]) => {
    return `${dir}=${coord}`
}).join('&');
const lang = 'de';
const maxRow = 1000;
const weatherApiURL = `http://api.weatherapi.com/v1/current.json?key=${key}`;
const citiesApiURL = `http://api.geonames.org/citiesJSON?${coordinatesString}&lang=${lang}&maxRows=${maxRow}&username=${username}`;

/*
* I am creating functions based on responsibities like one function serves only one purspose
*/

// This methods just fetches the weather information for a city
const getWeatherData = async (city) => {
    const url = `${weatherApiURL}${city}`;
    const response = await fetch(url);
    if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
    }
    return await response.json();
}

// This methods is displaying only the weather content for a location
const displayInformationOnScreen = (weatherData) => {
    // Only create a new variable if it is used at different location
    const { location, current } = weatherData
    document.querySelector('#name_city').innerHTML = location.name;
    document.querySelector("#tempC").innerHTML = current.temp_c;
    document.querySelector("#feels_like").innerHTML = `Feels like ${current.feelslike_c}`;
    document.querySelector("#humid_c").innerHTML = current.condition.text;
    document.querySelector("#humid_icon").src = `https://${current.condition.icon}`;
}

// This method loads the city name list as dropdown of select element.
const loadCityNames = (cities) => {
    /*
    * Always define, scope of the variable while declaring,
    * By not using const here will create the variable in global scope.
    */
    const selectElement = document.getElementById('city');
    cities.geonames.forEach(city => {
        const opt = document.createElement('option');
        opt.value = city.name;
        opt.innerHTML = city.name;
        selectElement.appendChild(opt);
    });
}

// This methods is fetching cities list from the api
const getCities = async () => {
    const cities = []
    try {
        const response = await fetch(citiesApiURL);
        cities = await response.json();
    } catch (error) {
        console.error('Error fetching cities', error);
    }
    return cities;
}

/*
* window.onload event will make sure that page has loaded before executing any javascript.
*/
window.onload = () => {
    /*
    * Used named function - here as that will help in debugging the issues properly as application grows
    */
    document.querySelector('#search').onclick = async function handleSearch() {
        const city = document.querySelector('#city').value;
        if (city != '') {
            try {
                const weatherData = await getWeatherData(city)
                displayInformationOnScreen(weatherData)
            } catch (error) {
                console.error(`ERROR: ${error.message}`);
            }
        }
    }
    /*
    * We can use promises to call methods one after another,
    * here loadCityNames is called as a callback once we get cities response
    */
    getCities().then((cities) => {
        loadCityNames(cities)
    })
}