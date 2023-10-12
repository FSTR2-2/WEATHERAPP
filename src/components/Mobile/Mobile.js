import { dateCodes } from "../../scripts/dateCodes";
import { weatherCodes } from "../../scripts/weatherCodes";
import { tns } from "../../../node_modules/tiny-slider/src/tiny-slider";
import { icons } from "../../scripts/icons";

import "./Mobile.css";

const Mobile = (element, data) => {
	console.log(data);

	let degreeType = JSON.parse(localStorage.getItem("degreeType"));

	if (!degreeType) {
		localStorage.setItem("degreeType", JSON.stringify("C"));
		degreeType = JSON.parse(localStorage.getItem("degreeType"));
	}

	const date = new Date(),
		currentMonth = date.getMonth(),
		currentDayOfMonth = date.getDate(),
		currentDayOfWeek = date.getDay(),
		currentHour = date.getHours();

	const sunrise = {
		hour: new Date(data.daily.sunrise[0]).getHours(),
		min: new Date(data.daily.sunrise[0]).getMinutes(),
	};
	const sunset = {
		hour: new Date(data.daily.sunset[0]).getHours(),
		min: new Date(data.daily.sunset[0]).getMinutes(),
	};

	function AirQualityIndex(co, no2, o3, pm2, pm10, so2) {
		const obj = {
			pm2:
				pm2 <= 10
					? "Good-#3CD087"
					: pm2 <= 20
					? "Fair-#3DACF4"
					: pm2 <= 25
					? "Moderate-#F97F2A"
					: pm2 <= 50
					? "Poor-#EF4902"
					: pm2 <= 75
					? "Very Poor-#960032"
					: "Extremely Poor-#7D2181",
			pm10:
				pm10 <= 20
					? "Good-#3CD087"
					: pm10 <= 40
					? "Fair-#3DACF4"
					: pm10 <= 50
					? "Moderate-#F97F2A"
					: pm10 <= 100
					? "Poor-#EF4902"
					: pm10 <= 150
					? "Very Poor-#960032"
					: "Extremely Poor-#7D2181",
			no2:
				no2 <= 40
					? "Good-#3CD087"
					: no2 <= 90
					? "Fair-#3DACF4"
					: no2 <= 120
					? "Moderate-#F97F2A"
					: no2 <= 230
					? "Poor-#EF4902"
					: no2 <= 340
					? "Very Poor-#960032"
					: "Extremely Poor-#7D2181",
			o3:
				o3 <= 50
					? "Good-#3CD087"
					: o3 <= 100
					? "Fair-#3DACF4"
					: o3 <= 130
					? "Moderate-#F97F2A"
					: o3 <= 240
					? "Poor-#EF4902"
					: o3 <= 380
					? "Very Poor-#960032"
					: "Extremely Poor-#7D2181",
			so2:
				so2 <= 100
					? "Good-#3CD087"
					: so2 <= 200
					? "Fair-#3DACF4"
					: so2 <= 350
					? "Moderate-#F97F2A"
					: so2 <= 500
					? "Poor-#EF4902"
					: so2 <= 750
					? "Very Poor-#960032"
					: "Extremely Poor-#7D2181",
			co:
				co <= 4.5
					? "Good-#3CD087"
					: co <= 9.5
					? "Moderate-#F97F2A"
					: co <= 12.5
					? "Poor-#EF4902"
					: co <= 30.5
					? "Very Poor-#960032"
					: "Extremely Poor-#7D2181",
		};

		const wellness = {
			co: {
				name: "co",
				value: co,
				state: obj.co.split("-")[0],
				color: obj.co.split("-")[1],
			},
			no2: {
				name: "no-2",
				value: no2,
				state: obj.no2.split("-")[0],
				color: obj.no2.split("-")[1],
			},
			o3: {
				name: "o-3",
				value: o3,
				state: obj.o3.split("-")[0],
				color: obj.o3.split("-")[1],
			},
			pm2: {
				name: "pm 2",
				value: pm2,
				state: obj.pm2.split("-")[0],
				color: obj.pm2.split("-")[1],
			},
			pm10: {
				name: "pm 10",
				value: pm10,
				state: obj.pm10.split("-")[0],
				color: obj.pm10.split("-")[1],
			},
			so2: {
				name: "so-2",
				value: so2,
				state: obj.so2.split("-")[0],
				color: obj.so2.split("-")[1],
			},
		};

		let count = 0;
		for (let well in wellness) {
			if (
				wellness[well].state === "Good" ||
				wellness[well].state === "Fair"
			) {
				count++;
			}
		}

		return {
			...wellness,
			suggestion:
				count >= 3
					? "A perfect day for a walk."
					: "Keep yourself inside.",
			iconColor: count >= 3 ? "#3CD087" : "#EF4902",
		};
	}

	const co = data.hourly.us_aqi_co[0];
	const no2 = data.hourly.nitrogen_dioxide[0];
	const o3 = data.hourly.ozone[0];
	const pm2 = data.hourly.pm2_5[0];
	const pm10 = data.hourly.pm10[0];
	const so2 = data.hourly.sulphur_dioxide[0];

	element.innerHTML = `
    <div id="menu" class="menu">
      
        <div class="menu-toggle hamburger-box">
          <i class="fi fi-rr-menu-burger"></i>
        </div>
      
        <div class="menu-container">
          <div class="menu-toggle cross-box">
            <i class="fi fi-br-cross"></i>
          </div>

          <div class="menu-items">
            <div class="search-container">
              <input type="search" placeholder="Search City or Postcode"/>
              <i class="fi fi-rr-search-location"></i>
            </div>
            <div class="menu-buttons">
              <div class="degree-toggle-container">
                <div class="toggle-cycle ${
					degreeType === "C" ? "active" : ""
				}"></div>
                <span class=${degreeType === "C" ? "active" : ""}>&deg;C</span>
                <span class=${degreeType === "F" ? "active" : ""}>&deg;F</span>
              </div>

              <a id="buymecoffee" href="https://www.buymeacoffee.com/hsrvms" target="_blank"><img src="https://cdn.buymeacoffee.com/buttons/v2/default-blue.png" alt="Buy Me A Coffee"  ></a>
            </div>
          </div>
        </div>
    </div>

    <main class="main-container">
      <section class="summary">
        <div class="date">
          <span>
            ${dateCodes.day[currentDayOfWeek].slice(0, 3)},
            ${dateCodes.month[currentMonth].slice(0, 3)}
            ${currentDayOfMonth}
          </span>
        </div>

        <div class="location-container">
          <span class="city">${data.area}</span>
          <span class="country">${data.country}</span>
        </div>

        <div class="temperature-container">
          <span class="temperature">
          ${Math.round(data.current_weather.temperature)}&deg;
          </span>
          <span class="weather-stuation">${
				weatherCodes[data.current_weather.weathercode]
			}</span>
        </div>

        <div class="sun-state">
          <div class="box">
            <i class="fi fi-rr-sunrise-alt"></i>
            <span>
              ${sunrise.hour}:${
		sunrise.min / 10 === 0 ? `0${sunrise.min}` : sunrise.min
	}
            am
            </span>
          </div>
          <div class="box">
            <i class="fi fi-rr-sunset"></i>
            <span>
              ${sunset.hour - 12}:${
		sunset.min / 10 === 0 ? `0${sunset.min}` : sunset.min
	}
              pm
            </span>
          </div>
        </div>

        <div class="slider-wrapper">
          <div id="cardSlider" class="card-slider">
            ${cardSlider(data.hourly)}
          </div>
        <div>
      </section>

      <section class="air-info">
        <div class="humidity box">
          <span class="number">
            ${
				data.hourly.relativehumidity_2m[currentHour]
			}<span class="type">%</span>
          </span>
          <span class="title">Humidity</span>
        </div>

        <div class="wind box">
          <span class="number">
            ${data.current_weather.windspeed}<span class="type">km/h</span>
          </span>
          <span class="title">Wind Speed</span>

        </div>
      </section>

      <section id="overview">
        <div class="header">
          <p>Overview</p>
        </div>

        <nav class="overview-navbar">
          <div name="airquality" class="nav-item active">air quality</div>
          <div name="uvindex" class="nav-item">uv index</div>
          <div name="rainfall" class="nav-item">rainfall</div>
          <div name="humidity" class="nav-item">humidity</div>
        </nav>

        <div id="overviewContainers">
          ${overviewContainers()}
        </div>
      </section>

      <section id="forecast">
        <div class="header">Forecasts</div>
        <div class="card-container">
          ${forecastCards()}
        </div>
      </section>
    </main>
  `;

	//! Forecast
	function forecastCards() {
    const dailyData = data.daily;
    console.log(dailyData)
		const cards = [];
    for(let i = 0; i < 3; i++){
      const card = `
        <div class="card">
          ${icons[dailyData.weathercode[i]]}
          <div class="minmax">
            <span class="max">${dailyData.temperature_2m_max[i]}&deg;</span>
            <span class="min">/${dailyData.temperature_2m_min[i]}&deg;</span>
          </div>
          <div class="date">
            <span class="month-day">${new Date(dailyData.time[i]).getDate()}</span>
            <span class="month-week">
              ${dateCodes.month[new Date(dailyData.time[i]).getMonth()].slice(0,3)},
              ${dateCodes.day[new Date(dailyData.time[i]).getDay()].slice(0,3)}
            </span>
          </div>
        </div>
      `
      cards.push(card)
    }

		return cards.join("");
	}

	//! Forecast

	//! Overview
	function overviewContainers() {
		const containers = [];

		const quality = AirQualityIndex(co, no2, o3, pm2, pm10, so2);
		const cardList = [];
		for (let key in quality) {
			if (key !== "suggestion" && key !== "iconColor") {
				let item = quality[key];
				const el = `
          <div class="card" style="background:${item.color}">
            <span class="value">${item.value}</span>
            <span class="type">
              ${item.name.split("-")[0]}
              ${
					item.name.split("-")[1] !== undefined
						? `<span class="sub">${item.name.split("-")[1]}</span>`
						: ""
				}
            </span>
          </div>
      `;

				cardList.push(el);
			}
		}

		const airquality = `
      <div id="airqualityMobile" class="container active">
        <div class="inner-header">Air Quality</div>
        <div class="info-box">
          <i class="fi fi-sr-wind" style="color:${quality.iconColor}"></i>
          <div class="text-box">
            <span class="color-text" style="color:${quality.iconColor}">${
			quality.pm10.state
		}</span>
            <span class="normal-text">${quality.suggestion}</span>
          </div>
        </div>

        <div class="card-box">
          ${cardList.join("")}
        </div>
      </div>
    `;

		containers.push(airquality);

		return containers.join("");
	}
	//! Overview

	// ! Menu
	const menuButtons = document.querySelectorAll(".menu-toggle");
	const menu = document.querySelector("#menu");
	const degreeToggle = menu.querySelector(".degree-toggle-container");
	const degreeCycle = degreeToggle.querySelector(".toggle-cycle");
	const degreeLetters = degreeToggle.querySelectorAll("span");

	menuButtons.forEach((button) => {
		button.addEventListener("click", () => {
			menu.classList.toggle("active");
		});
	});

	degreeToggle.addEventListener("click", () => {
		degreeCycle.classList.toggle("active");
		degreeLetters.forEach((letter) => {
			letter.classList.toggle("active");
		});
		degreeType = degreeType === "C" ? "F" : "C";
		localStorage.setItem("degreeType", JSON.stringify(degreeType));

		const toggleEvent = new CustomEvent("toggledegree", {
			detail: { degreeType },
		});

		setTimeout(() => {
			document.dispatchEvent(toggleEvent);
		}, 250);
	});

	//! Menu

	//! Card Slider

	function cardSlider(hourlyData) {
		const cardsArray = [];
		const currentHour = new Date().getHours();
		const startingPoint = currentHour - 1;
		const endPoint = startingPoint + 23;

		for (let i = startingPoint; i <= endPoint; i++) {
			let hour = new Date(hourlyData.time[i]).getHours();

			hour =
				hour < 12
					? `${hour} am`
					: hour === 12
					? `${hour} pm`
					: `${hour - 12} pm`;
			let iconCode = hourlyData.weathercode[i];
			let temperature = Math.round(hourlyData.temperature_2m[i]);
			const card = `
      <div class="card ${hour === currentHour ? "currentHour" : ""}">
      <div class="card-container">
      <span class="time">${hour}</span>
      <span class="icon-box">
      ${icons[iconCode]}
      </span>
      <span class="temperature">${temperature}&deg</span>
      </div>
      </div>
      `;

			cardsArray.push(card);
		}

		return cardsArray.join(" ");
	}

	let slider = tns({
		container: "#cardSlider",
		loop: false,
		items: 3,
		slideBy: "page",
		mouseDrag: true,
		swipeAngle: false,
		speed: 100,
		controls: false,
		nav: false,
		responsive: {
			500: {
				items: 5,
			},
			800: {
				items: 6,
			},
			1024: {
				items: 8,
			},
			1300: {
				items: 10,
			},
			1440: {
				items: 12,
			},
		},
	});
	slider.play();

	//! Card Slider
};

export default Mobile;
