const input = document.querySelector('input');
const btn = document.querySelector('button');
const header = document.querySelector('h1');
const date = document.querySelector('.date');
const time = document.querySelector('.time');
const humidity = document.querySelector('.humidity');
const pressure = document.querySelector('.pressure');
const wind = document.querySelector('.wind');
const temp = document.querySelector('.temp');
const minTemp = document.querySelector('.min');
const maxTemp = document.querySelector('.max');
const feelsLike = document.querySelector('.feels-like');
const clouds = document.querySelector('.clouds');
const weatherContainer = document.querySelector('.weather-info');
const celFarenBtns = document.querySelectorAll('.buttons > button');
const today = new Date();

let globalData;

async function getWeather() {
    const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${input.value}&APPID=80d3770f43e41ef86755eb8fd951799b`,
        { mode: 'cors' },
    );
    const data = await response.json();
    globalData = data;
    populateParas(data);
    return data;
}

btn.addEventListener('click', async e => {
    e.preventDefault();
    await getWeather();
    getDateAndTime();
    input.value = '';
});

celFarenBtns.forEach(btn => {
    btn.addEventListener('click', e => {
        e.preventDefault();
        if (btn.textContent === '°C') {
            e.currentTarget.classList.toggle('active');
            celFarenBtns[1].classList.remove('active');
            populateParas(globalData, 'celsius');
        } else if (btn.textContent === '°F') {
            e.currentTarget.classList.toggle('active');
            celFarenBtns[0].classList.remove('active');
            populateParas(globalData, 'faren');
        }
    });
});

function populateParas(data, deg = 'celsius') {
    const celsius = (data.main.temp - 273.15).toFixed(2);
    const faren = (celsius * (9 / 5) + 32).toFixed(2);

    const minCelsius = (data.main.temp_min - 273.15).toFixed(2);
    const minFaren = (celsius * (9 / 5) + 32).toFixed(2);

    const maxCelsius = (data.main.temp_max - 273.15).toFixed(2);
    const maxFaren = (celsius * (9 / 5) + 32).toFixed(2);

    const feelsLikeCelsius = (data.main.feels_like - 273.15).toFixed(2);
    const feelsLikeFaren = (celsius * (9 / 5) + 32).toFixed(2);
    console.log(data);
    header.textContent = `${data.name}, ${data.sys.country}`;
    humidity.textContent = `Humidity: ${data.main.humidity}%`;
    pressure.textContent = `Pressure: ${data.main.pressure} hPa`;
    wind.textContent = `Wind: ${data.wind.speed} Km/h`;
    if (deg === 'celsius') {
        temp.textContent = `${celsius} °C`;
        minTemp.textContent = `${minCelsius}`;
        maxTemp.textContent = `${maxCelsius}`;
        feelsLike.textContent = `Feels like: ${feelsLikeCelsius}°C`;
    } else {
        temp.textContent = `${faren} °C`;
        minTemp.textContent = `${minFaren}`;
        maxTemp.textContent = `${maxFaren}`;
        feelsLike.textContent = `Feels like: ${feelsLikeFaren}°C`;
    }

    clouds.textContent = `Cloudiness: ${data.clouds.all}%`;
    weatherContainer.style.display = 'flex';
}

function getDateAndTime() {
    date.textContent = `${myDate().month} ${today.getDate()}, ${today.getFullYear()} - ${
        myDate().day
    }`;
    time.textContent = `${today.getHours()}:${today.getUTCMinutes()}`;
}

function myDate() {
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const day = days[today.getDay()];

    const months = [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December',
    ];
    const month = months[today.getMonth()];
    return { day, month };
}
