



//Function to fetch weather data from the API
async function getWeather(city) {
    const url = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${city}?unitGroup=metric&key=RSZ9HKXPWCNGXPHZVH4ERWTRW&contentType=json`
    try{
        const response = await fetch(url);
        const data = await response.json();
        if (response.ok) {
            return data;
        } else {
            throw new Error("error");
        }
    } catch (error) {
        alert(error);
    }
}

const card = document.querySelector(".card");
const searchButton = document.querySelector("button");

// Event listener for search button and load data
searchButton.addEventListener("click", async function(e) {
    e.preventDefault();
    const city = document.querySelector("input").value;
    const data = await getWeather(city);
    document.querySelector("#city").textContent = data.address;
    document.querySelector("#temp").textContent = `${data.currentConditions.temp}°C`;
    document.querySelector("#description").textContent = data.currentConditions.conditions;
    const icon = document.querySelector("img");
    icon.src = `weather-icons/${data.currentConditions.icon}.svg`;
    icon.style.display = "block";
    
    
});


// Load inital city weather
document.addEventListener("DOMContentLoaded", async function() {
    const data = await getWeather("New York");
    document.querySelector("#city").textContent = data.address;
    document.querySelector("#temp").textContent = `${Math.round(data.currentConditions.temp)} °C`;
    document.querySelector("#description").textContent = data.currentConditions.conditions;
    const icon = document.querySelector("img");
    icon.src = `weather-icons/${data.currentConditions.icon}.svg`;
    icon.style.display = "block";
    document.querySelector("#feels-like").textContent = `Feels like: ${Math.round(data.currentConditions.feelslike)} °C`;
    document.querySelector("#humidity").textContent = `Humidity: ${data.currentConditions.humidity}%`;
    document.querySelector("#wind").textContent = `Wind: ${data.currentConditions.windspeed} km/h`;
    console.log(data);
});


