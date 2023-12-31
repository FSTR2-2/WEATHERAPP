import "./styles/global.scss";
import { getData } from "./scripts/utils";

import Navbar from "./components/Navbar/Navbar";
import DateTime from "./components/DateTime/DateTime";
import Search from "./components/Search/Search";
import ThemeSwitch from "./components/ThemeSwitch/ThemeSwitch";
import DailySummary from "./components/DailySummary/DailySummary";
import Calendar from "./components/Calendar/Calendar";
import Overview from "./components/Overview/Overview";
import Forecast from "./components/Forecast/Forecast";
import AirQuality from "./components/Overview/AirQuality/AirQuality";
import DegreeSwitch from "./components/DegreeSwitch/DegreeSwitch";
import UvIndex from "./components/Overview/UvIndex/UvIndex";
import Rainfall from "./components/Overview/Rainfall/Rainfall";
import Humidity from "./components/Overview/Humidity/Humidity";
import SunState from "./components/SunState/SunState";
import Mobile from "./components/Mobile/Mobile";

const app = document.querySelector("#app");

window.innerWidth >= 1200 ? renderDesktop() : renderMobile();

window.addEventListener("resize", () => {
	if (window.innerWidth >= 1200) {
		renderDesktop();
	} else {
		renderMobile();
	}
});

function renderDesktop() {
	app.innerHTML = `
		<div id="app-container">
			<nav id="navbar" class="section"></nav>                
			<section id="dateTime" class="section"></section>          
			<section id="search" class="section"></section>        
			<section id="degreeSwitch" class="section"></section>   
			<section id="themeSwitch" class="section"></section>   
			<section id="dailySummary" class="section"></section>  
			<section id="calendar" class="section"></section>      
			<section id="overview" class="section"></section>      
			<section id="forecast" class="section"></section>        
			<section id="sunstate" class="section"></section>        
		</div>
	`;

	let city;

	document.addEventListener("search", async (e) => {
		city = e.detail.searchValue;
		await renderComponents(city);
	});

	document.addEventListener("toggledegree", (e) => {
		renderComponents(city);
	});

	async function renderComponents(city) {
		let degreeType = JSON.parse(localStorage.getItem("degreeType"));
		if (!degreeType) {
			localStorage.setItem("degreeType", JSON.stringify("C"));
			degreeType = JSON.parse(localStorage.getItem("degreeType"));
		}

		const data = await getData(city, degreeType);

		Navbar(document.querySelector("#navbar"));
		DateTime(document.querySelector("#dateTime"), data);
		Search(document.querySelector("#search"));
		ThemeSwitch(document.querySelector("#themeSwitch"));
		DegreeSwitch(document.querySelector("#degreeSwitch"));
		DailySummary(document.querySelector("#dailySummary"), data);
		Calendar(document.querySelector("#calendar"));
		Overview(document.querySelector("#overview"), data);
		Forecast(document.querySelector("#forecast"), data);
		AirQuality(document.querySelector("#airquality"), data);
		UvIndex(document.querySelector("#uvindex"), data);
		Rainfall(document.querySelector("#rainfall"), data);
		Humidity(document.querySelector("#humidity"), data);
		SunState(document.querySelector("#sunstate"), data);
	}

	renderComponents();
}

function renderMobile() {
	app.innerHTML = `
			<div id="mobile-app-container">
				<div id="mobile"></div>  
			</div>
	`;

	let city;

	document.addEventListener("search", async (e) => {
		city = e.detail.searchValue;
		await renderComponents(city);
	});

	document.addEventListener("toggledegree", (e) => {
		renderComponents(city);
	});

	async function renderComponents(city) {
		let degreeType = JSON.parse(localStorage.getItem("degreeType"));
		if (!degreeType) {
			localStorage.setItem("degreeType", JSON.stringify("C"));
			degreeType = JSON.parse(localStorage.getItem("degreeType"));
		}

		const data = await getData(city, degreeType);

		Mobile(document.querySelector("#mobile"), data);
	}

	renderComponents();
}
