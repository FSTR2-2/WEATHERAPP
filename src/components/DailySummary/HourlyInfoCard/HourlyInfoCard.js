import { icons } from "../../../scripts/icons";


const HourlyInfoCard = (hourlyData) => {
 console.log(hourlyData)
 const cardsArray = [];
 const currentHour = new Date().getHours();
 const startingPoint = currentHour - 3;
 const endPoint = startingPoint + 23;
 
 console.log(startingPoint, endPoint);
  for (let i = startingPoint; i <= endPoint; i++) {
   let hour = new Date(hourlyData.time[i]).getHours();
   
    hour = hour < 12 ? `${hour} am` : hour === 12 ? `${hour} pm` : `${hour - 12} pm`;
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
  `;

    cardsArray.push(card);
  }

  return cardsArray.join(" ");
}

export default HourlyInfoCard;