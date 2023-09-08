import "./global.css";
import Navbar from "./components/Navbar/Navbar";
import Date from "./components/Date/Date";
import Search from "./components/Search/Search";
import ThemeSwitch from "./components/ThemeSwitch/ThemeSwitch";
import DailySummary from "./components/DailySummary/DailySummary";
import Overview from "./components/Overview/Overview";
import Forecast from "./components/Forecast/Forecast";
import AirQuality from "./components/AirQuality/AirQuality";

const app = document.querySelector("#app");
app.innerHTML = `
  <div id="app-container">
    <nav id="navbar" class="section"></nav>                 <!-- someone -->
    <section id="date" class="section"></section>           <!-- someone -->
    <section id="search" class="section"></section>         <!-- someone -->
    <section id="themeSwitch" class="section"></section>    <!-- someone -->
    <section id="dailySummary" class="section"></section>   <!-- someone -->
    <section id="overview" class="section"></section>       <!-- someone -->
    <section id="forecast" class="section"></section>       <!-- someone -->
    <section id="airQuality" class="section"></section>     <!-- someone -->
  </div>
`;

Navbar(document.querySelector("#navbar"));
Date(document.querySelector("#date"));
Search(document.querySelector("#search"));
ThemeSwitch(document.querySelector("#themeSwitch"));
DailySummary(document.querySelector("#dailySummary"));
Overview(document.querySelector("#overview"));
Forecast(document.querySelector("#forecast"));
AirQuality(document.querySelector("#airQuality"));

