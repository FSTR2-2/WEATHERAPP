import "./DailySummary.css";

async function getData(city) {
  const locationData = await getLocationData(city);
  const { latitude, longitude, area, country } = locationData;
  const url = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&hourly=temperature_2m,weathercode,relativehumidity_2m&daily=weathercode&current_weather=true&timezone=auto&forecast_days=1`;

  const data = await fetch(url).then((response) => response.json());

  return {
    area: area,
    country: country,
    ...data,
  };
}

async function getLocationData(city) {
  city = city.trim().toLowerCase();
  const url = `https://geocoding-api.open-meteo.com/v1/search?name=${city}&count=1&language=en&format=json`;
  const data = await fetch(url)
    .then((response) => response.json())
    .then((data) => data.results[0])
    .catch((e) => console.log(`Error occured: ${e}`));
  const latitude = truncateCoordinate(data.latitude, 2);
  const longitude = truncateCoordinate(data.longitude, 2);

  return {
    latitude: latitude,
    longitude: longitude,
    area: data.name,
    country: data.country,
  };
}

function truncateCoordinate(coordinateStr, precision) {
  const coordinate = parseFloat(coordinateStr);
  if (isNaN(coordinate)) {
    throw new Error("Invalid coordinate format");
  }
  const factor = Math.pow(10, precision);
  const truncatedCoordinate = Math.round(coordinate * factor) / factor;
  return truncatedCoordinate;
}

function createHourlyInfoCards(hourlyData) {
 const icons = {
  0 : '<i class="fi fi-rr-brightness"></i>',
  1 : '<i class="fi fi-rr-cloud-sun"></i>',
  2 : '<i class="fi fi-rr-clouds-sun"></i>',
  3 : '<i class="fi fi-rr-clouds"></i>',
  45 : '<i class="fi fi-rr-fog"></i>',
  48 : '<i class="fi fi-rr-fog"></i>',
  51 : '<i class="fi fi-rr-cloud-drizzle"></i>',
  53 : '<i class="fi fi-rr-cloud-drizzle"></i>',
  55 : '<i class="fi fi-rr-cloud-drizzle"></i>',
  56 : '<i class="fi fi-rr-snowflakes"></i>',
  57 : '<i class="fi fi-rr-snowflakes"></i>',
  61 : '<i class="fi fi-rr-cloud-rain"></i>',
  63 : '<i class="fi fi-rr-cloud-showers"></i>',
  65 : '<i class="fi fi-rr-cloud-showers-heavy"></i>',
  66 : '<i class="fi fi-rr-cloud-showers"></i>',
  67 : '<i class="fi fi-rr-cloud-showers-heavy"></i>',
  71 : '<i class="fi fi-rr-cloud-snow"></i>',
  73 : '<i class="fi fi-rr-cloud-snow"></i>',
  75 : '<i class="fi fi-rr-cloud-snow"></i>',
  77 : '<i class="fi fi-rr-cloud-snow"></i>',
  80 : '<i class="fi fi-rr-cloud-rain"></i>',
  81 : '<i class="fi fi-rr-cloud-showers"></i>',
  82 : '<i class="fi fi-rr-cloud-showers-heavy"></i>',
  85 : '<i class="fi fi-rr-cloud-snow"></i>',
  86 : '<i class="fi fi-rr-cloud-snow"></i>',
  95 : '<i class="fi fi-rr-thunderstorm"></i>',
  96 : '<i class="fi fi-rr-thunderstorm"></i>',
  99 : '<i class="fi fi-rr-thunderstorm"></i>',
 }
 const cardsArray = [];
 for(let i = 0; i < 24; i++) {
  let hour = i < 12 ? `${i} am` : i === 12 ? `${i} pm` : `${i - 12} pm`;
  let iconCode = hourlyData.weathercode[i];
  let temperature = Math.round(hourlyData.temperature_2m[i]);
  const card = `
   <li class="list-item">
    <div class="card-container">
     <span class="time">${hour}</span>
     <span class="icon-box">
      ${icons[iconCode]}
     </span>
     <span class="temperature">${temperature}&deg</span>
    </div>
   </li>
  `

  cardsArray.push(card);
 }

 return cardsArray.join(' ');
}

const DailySummary = async (element) => {
  const city = "istanbul";
  const currentDate = new Date();
  const currentHour = currentDate.getHours();
  const data = await getData(city);

  console.log(data);

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
      <div>${data.current_weather.temperature}<span class="degree">&deg</span></div>
      <span class="label">Temperature</span>
     </div>
     <div class="box">
      <div>${data.hourly.relativehumidity_2m[currentHour]}<span class="percentage">%</span></div>
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
     ${createHourlyInfoCards(data.hourly)}
    </ul>
   </div>
  </div>
 `;
};

export default DailySummary;
