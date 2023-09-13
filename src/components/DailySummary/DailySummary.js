import "./DailySummary.css";
import { getData } from "../../scripts/utils";
import CardSlider from "./CardSlider/CardSlider";
import assets from "../../assets/assets";
import { tns } from "../../../node_modules/tiny-slider/src/tiny-slider";

const DailySummary = async (element) => {
 const city = "istanbul";
 const currentDate = new Date();
 const currentHour = currentDate.getHours();
 const data = await getData(city);

 element.innerHTML = `
  <div class="container"> 
   <img class="bg-img" src="${assets.sunshine}">
   <div class="top-side">
    <div class="illustration-box">
      <img src="${assets.partialCloud1}">
    </div>
    <div class="location-box">
     <span class="city">${data.area}</span>
     <span class="country">${data.country}</span>
    </div>
    <div class="full-day-info">
     <div class="box">
      <div>${
       data.current_weather.temperature
      }<span class="degree">&deg</span></div>
      <span class="label">Temperature</span>
     </div>
     <div class="box">
      <div>${
       data.hourly.relativehumidity_2m[currentHour]
      }<span class="percentage">%</span></div>
      <span class="label">Humidity</span>
     </div>
     <div class="box">
      <div>${data.current_weather.windspeed}<span class="km">km/h</span></div>
      <span class="label">Wind Speed</span>
     </div>
    </div>
   </div>
   
   <div id="slider" class="bottom-side">
    <div id="cardWrapper" >
     ${CardSlider(data.hourly)}
    </div>
   </div>
  </div>
 `;

 let slider = tns({
  container: "#cardWrapper",
  loop: false,
  items: 5,
  slideBy: "page",
  mouseDrag: true,
  swipeAngle: false,
  speed: 400,
  // autoWidth: true,
  // autoHeight: true,
  // viewportMax: true,
  controls: false,
  nav: false,
  responsive: {
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
};

export default DailySummary;
