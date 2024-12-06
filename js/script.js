
// Keep constants seperate from actual code.
const weatherApiURL = "http://api.weatherapi.com/v1/current.json?key=1ba70ac989c045888d7210602241011&q="

// Give proper names to the method created
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
    const {location, current} = weatherData // {location: {name:"asas"}, current:{temp_c:"123", feelslike_c:"sda"}, condition: {text:"", icon:""}}
    document.querySelector('#name_city').innerHTML = location.name;
    document.querySelector("#tempC").innerHTML = current.temp_c;
    document.querySelector("#feels_like").innerHTML = `Feels like ${current.feelslike_c}`;
    document.querySelector("#humid_c").innerHTML = current.condition.text;
    document.querySelector("#humid_icon").src = current.condition.icon;
}

const demoFunction = () => {
    console.log('First')
    setTimeout(() => {
        console.log('inside setTimeout')
    },0)
    console.log('Last')
}

const functionExecution = () => {
    console.log('start')
    const printfn = () => {
        console.log('print me')
    }
    // setTimeout(printfn,0)
    printfn()
    const computationalHeavy = () => {
        let sum = 0
        for(let i = 0; i<100000; i++){
            for(let j = 0; j< 100000; j++){
                sum+=(i+j)
            }
        }
    }
    computationalHeavy()
    console.log('last')
}

/*
* window.onload event will make sure that page has loaded before executing any javascript.
*/
window.onload = () => {
    /*
    * Used named function - here as that will help in debugging the issues properly as application grows
    */
    document.querySelector('#search').onclick = async function handleSearch() {
        // we can user document.querySelector as this is more powerful that getElementById
        const city = document.querySelector('#city').value;
        // demoFunction()
        if (city != '') {
            try {
                // const weatherData = await getWeatherData(city)  // fetch information from api
                // displayInformationOnScreen(weatherData) // display the content on screen
                // demoFunction()
                functionExecution()
                // const url = `${weatherApiURL}${city}`;
                // const fetchPromise = fetch(url) // 
                // fetchPromise.then(res => {
                //     return res.json()
                // }).then((data) => {
                //     console.log(data)
                // }).catch((err) => {
                //     console.log(err)
                // })
            } catch (error) {
                console.error(`ERROR: ${error.message}`);
            }
        }
    }
}