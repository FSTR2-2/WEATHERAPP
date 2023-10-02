import "./styles/global.scss";
import {getData} from './scripts/utils'

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

const app = document.querySelector("#app");
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
  </div>
`;

document.addEventListener("search", async (e) => {
	const searchCity = e.detail.searchValue;
  renderComponents(searchCity)
});

async function renderComponents(city) {
  const data = await getData(city);

  Navbar(document.querySelector("#navbar"));
  DateTime(document.querySelector("#dateTime"), data);
  Search(document.querySelector("#search"));
  ThemeSwitch(document.querySelector("#themeSwitch"));
  DegreeSwitch(document.querySelector("#degreeSwitch"));
  DailySummary(document.querySelector("#dailySummary"), data);
  Calendar(document.querySelector("#calendar"));
  Overview(document.querySelector("#overview"), data);
  Forecast(document.querySelector("#forecast"), data);
  AirQuality(document.querySelector("#airQuality"), data);
}

renderComponents();




