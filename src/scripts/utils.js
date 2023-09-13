async function getData(city) {
  const locationData = await getLocationData(city);
  const { latitude, longitude, area, country } = locationData;
  const url = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&hourly=temperature_2m,weathercode,relativehumidity_2m&daily=weathercode&current_weather=true&timezone=auto&forecast_days=2`;

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

export { getData };
