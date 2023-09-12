import "./DailySummary.css";
import { getData } from "../../scripts/utils";
import HourlyInfoCard from './HourlyInfoCard/HourlyInfoCard';

const DailySummary = async (element) => {
  const city = "istanbul";
  const currentDate = new Date();
  const currentHour = currentDate.getHours();
  const data = await getData(city);

  element.innerHTML = `
  <div class="container"> 
   <div class="top-side">
    <div class="illustration-box"></div>
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
   
   <div class="bottom-side">
    <ul class="hourly-info-list">
     ${HourlyInfoCard(data.hourly)}
    </ul>
   </div>
  </div>
 `;
};

export default DailySummary;
