import { MY_API_KEY } from "./config.js";

const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': MY_API_KEY,
		'X-RapidAPI-Host': 'weather-api99.p.rapidapi.com'
	}
};

const searchbtn = document.querySelector("button");
const searchbar = document.querySelector(".search-bar");

const weather = {
  fetchWeatherAPI: function (city) {
        fetch(`https://weather-api99.p.rapidapi.com/weather?city=${city}&units=metric`, options)
        .then((response) => response.json())
        .then((data) => this.displayWeather(data))
        .catch((err) => console.log(err));
    },
    displayWeather: function (data) {
        const { name } = data;
        const { icon, description } = data.weather[0];
        const { temp, humidity } = data.main;
        const celsius = temp - 273.15;
        const { speed } = data.wind;
        document.querySelector(".city").innerText = name;
        document.querySelector(".icon").src = "http://openweathermap.org/img/wn/" + icon + "@2x.png"
        document.querySelector(".description").innerText = description;
        document.querySelector(".temp").innerText = celsius + "°C";
        document.querySelector(".humidity").innerText = "Humidity : " + humidity + "%";
        document.querySelector(".wind").innerText = "Wind-speed : " + speed + "mps";
    },
    search: function () {
        this.fetchWeatherAPI(searchbar.value.trim())
    }
};


let query_button = searchbtn.addEventListener('click', weather.search());
let query_enter = searchbar.addEventListener('keyup', (event) => {
    if (event.key == "Enter") {
    weather.search()
    };
});

if(query_button || query_enter) {
weather.displayWeather(searchbar.value);
}
