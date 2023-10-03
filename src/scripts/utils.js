async function getData(city='istanbul') {
  const locationData = await getLocationData(city);
  const { latitude, longitude, area, country } = locationData;
  const url = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&hourly=temperature_2m,relativehumidity_2m,precipitation_probability,weathercode,uv_index&daily=weathercode,temperature_2m_max,temperature_2m_min&current_weather=true&timezone=auto&forecast_days=14`;
  const aqUrl = `https://air-quality-api.open-meteo.com/v1/air-quality?latitude=${latitude}&longitude=${longitude}&hourly=pm10,pm2_5,carbon_monoxide,nitrogen_dioxide,sulphur_dioxide,european_aqi,ozone&timezone=auto`

  const data = await fetch(url).then((response) => response.json());
  const aqData = await fetch(aqUrl).then((response) => response.json()); //! Data for AirQuality

  const mergedData = {
    ...data,
    hourly: {
      ...data.hourly,
      ...aqData.hourly
    }
  }

  return {
    area: area,
    country: country,
    ...mergedData,
  };
}

async function getLocationData(city) {
  if(!city) return;
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

export { getData };
