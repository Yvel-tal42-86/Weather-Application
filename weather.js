let weather = {
    apiKey: API_KEY,
    fetchWeatherAPI: function (city) {
        fetch(
            "http://api.openweathermap.org/data/2.5/weather?q=" +
            city +
            "&units=metric&appid=" +
            this.apiKey
        ).then((response) => response.json());
    },
    displayWeather: function (data) {
        const { name } = data;
        const { icon, desciption } = data.weather[0];
        const { temp, humidity } = data.main;
        const { speed } = data.wind;
        document.querySelector(".city").innerText = name;
        document.querySelector(".icon").src = "http://openweathermap.org/img/wn/" + icon + "@2x.png"
        document.querySelector(".description").innerText = desciption;
        document.querySelector(".temp").innerText = temp + "°C";
        document.querySelector(".humidity").innerText = "Humidity :" + humidity + "%";
        document.querySelector(".wind").innerText = "Wind-speed :" + speed + "km/h";
    },
    search: function () {
        this.fetchWeatherAPI(document.querySelector(".search-bar").value);
    }
};

document.querySelector(".search button").addEventListener("click", function () {
    weather.search()
});
document.querySelector(".search-bar").addEventListener("keyup", function (event) {
    if (event.key == "Enter") {
        weather.search()
    }
});
