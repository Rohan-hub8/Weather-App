const apiKey = "c7ae5ed01614e6e40feaa3751b027b41";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?";

const city = document.querySelector(".city");
const btn = document.querySelector("button");
const temp = document.querySelector("#temp");
const humid = document.querySelector(".curr-humid");
const wind = document.querySelector(".curr-speed");
const img = document.querySelector(".weather-icon");
const err = document.querySelector(".error");
const recent = document.querySelector(".recent-search");

btn.addEventListener("click", (e) => {
    e.preventDefault();
    updateInfo();
});

const updateInfo = async () => {
    let input = document.querySelector(".search input");
    let inVal = input.value;
    
    const URL = `${apiUrl}q=${inVal.toLowerCase()}&appid=${apiKey}&units=metric`;
    let response = await fetch(URL);

    if (inVal === "") {
        document.querySelector(".weather").style.visibility = "hidden";
        document.querySelector(".info").style.visibility = "hidden";
        err.innerText = "";
    } else if (response.status == 404) {
        document.querySelector(".weather").style.visibility = "hidden";
        document.querySelector(".info").style.visibility = "hidden";
        err.innerText = "Invalid City Name";
    } else {
        let data = await response.json();
        console.log(data);
        city.innerText = data.name;
        temp.innerText = data.main.temp + "°c";
        humid.innerText = data.main.humidity + "%";
        wind.innerText = data.wind.speed + " km/h";
        img.src = `images/${data.weather[0].main.    toLowerCase()}.png`;
        document.querySelector(".weather").style.visibility = "visible";
        document.querySelector(".info").style.visibility = "visible";
        err.innerText = "";
    }
}

window.addEventListener("load", () => {
    updateInfo();
});