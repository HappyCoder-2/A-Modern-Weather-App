
// Weather App Project

// step 1. visit the webpage and register for a free acc
// https://openweathermap.org/

// step 2. get elements from HTML

const weatherForm = document.querySelector(".weatherForm");
const cityInput = document.querySelector(".cityInput");
const displayPart = document.querySelector(".display-part");
const apiKey = "8fb58a5831e2fdce30800a31c204a438";

weatherForm.addEventListener("submit", async event =>{
        
        event.preventDefault();
        const city = cityInput.value;

        if(city){
                try{
                        const weatherData = await getWeatherData(city);
                        displayWeatherInfo(weatherData);

                }
                catch(error){
                        console.error(error);
                        displayError(error);
                }
        }
        else{
                displayError("Please enter a city");
        }
});

async function getWeatherData(city){
        const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;
        const response = await fetch(apiUrl);

        if(!response.ok){
                throw new Error("Could not fetch weather data");
        }

        return await response.json()
}

function displayWeatherInfo(data){
        const {name: city, 
                main:{temp, humidity}, 
                weather: [{description, id}]} = data;

        displayPart.textContent = "";
        displayPart.style.display = "flex";

        const cityDisplay = document.createElement("h1");
        const tempDisplay = document.createElement("p");
        const humidityDisplay = document.createElement("p");
        const descDisplay = document.createElement("p");
        const weatherEmoji = document.createElement("p");
        
        cityDisplay.textContent = city;
        tempDisplay.textContent = `${(temp - 273.15).toFixed(1)}°C`;
        humidityDisplay.textContent = `Humidity: ${humidity}%`;
        descDisplay.textContent = description;
        weatherEmoji.textContent = getWeatherEmoji(id);



        cityDisplay.classList.add("cityDisplay");
        tempDisplay.classList.add("tempDisplay");
        humidityDisplay.classList.add("humidityDisplay");
        descDisplay.classList.add("descDisplay");
        weatherEmoji.classList.add("weatherEmoji");


        displayPart.appendChild(cityDisplay);
        displayPart.appendChild(tempDisplay);
        displayPart.appendChild(humidityDisplay);
        displayPart.appendChild(descDisplay);
        displayPart.appendChild(weatherEmoji);
}

function getWeatherEmoji(weatherId){
        switch(true){
                case (weatherId >= 200 && weatherId < 300):
                return "⛈️";
                case (weatherId >= 300 && weatherId < 400):
                return "🌦️";
                case (weatherId >= 500 && weatherId < 600):
                return "🌧️";
                case (weatherId >= 600 && weatherId < 700):
                return "❄️";
                case (weatherId >= 700 && weatherId < 800):
                return "🌫️";
                case (weatherId === 800):
                return "☀️";
                case (weatherId >= 801 && weatherId < 810):
                return "☁️";
                default:
                return "🌡️"
        }
}

function displayError(message){
        const errorDisplay = document.createElement("p");
        errorDisplay.textContent = message;
        errorDisplay.classList.add("errorDisplay");

        displayPart.textContent = "";
        displayPart.style.display = "flex";
        displayPart.appendChild(errorDisplay);
}