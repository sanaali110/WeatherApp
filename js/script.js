
const weatherApiURL = "http://api.weatherapi.com/v1/current.json?key=1ba70ac989c045888d7210602241011&q="
// give proper names to the method created
const getWeatherData = async (city) => {
    const url = `${weatherApiURL}${city}`;
    const response = await fetch(url);
    if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
    }
    return await response.json();
}
const displayInformationOnScreen = (weatherData) => {
    // Only create a new variable if it is used at different location
    const {location, current} = weatherData
    document.querySelector('#name_city').innerHTML = location.name;
    document.querySelector("#tempC").innerHTML = current.temp_c;
    document.querySelector("#feels_like").innerHTML = `Feels like ${current.feelslike_c}`;
    document.querySelector("#humid_c").innerHTML = current.condition.text;
    document.querySelector("#humid_icon").src = current.condition.icon;
}

const loadCityNames= () => {

}
async function getCityNames(){
        
    const url = 'http://api.geonames.org/citiesJSON?north=44.1&south=-9.9&east=-22.4&west=55.2&lang=de&maxRows=1000&username=sanaali';

    try {
            const response = await fetch(url);
            const result = await response.json();
            //console.log(result);
           
            selectElement = document.getElementById('city');
            result.geonames.forEach(city => {
            console.log(city.name);
            
            const opt = document.createElement('option');
            opt.value = city.name;
            opt.innerHTML = city.name;
            selectElement.appendChild(opt);
        });
   
    
    } catch (error) {
        console.error(error);
    }
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
   
    getCityNames();
  }

