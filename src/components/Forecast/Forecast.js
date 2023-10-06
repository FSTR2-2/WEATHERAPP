import "./Forecast.css";
import { dateCodes } from "../../scripts/dateCodes";
import { icons } from "../../scripts/icons";



const Forecast = async (element, data) => {

  const newData = {
    maxTemp : data.daily.temperature_2m_max.filter((item, index)=> (index <= 10 && index > 0)),
    minTemp : data.daily.temperature_2m_min.filter((item, index)=> (index <= 10 && index > 0)),
    date : data.daily.time.filter((item, index)=> (index <= 10 && index > 0)),
    iconCode : data.daily.weathercode.filter((item, index)=> (index <= 10 && index > 0)),
  } 

  const cardList = [];
  //console.log(dateCodes)

  for (let i=0; i<10; i++){
    let dayNumber = newData.date[i].split("-")[2];
    let monthNumber = newData.date[i].split("-")[1];
    let dateIndex = new Date(`${newData.date[i]}`);
    let dayWeek = dateIndex.getDay();
    let dayWeekFinal = dateCodes.day[dayWeek].slice(0,3);
    const li = `
    <li class="card">
      <div class="left-side-card">
        <span>${icons[newData.iconCode[i]]}</span>
        <span class="temp-box max">+${Math.round(newData.maxTemp[i])}&deg</span>
        <span class="temp-box min">/+${Math.round(newData.minTemp[i])}&deg</span>
      </div>
      <div class="right-side-card">
            <span class="date-box">
              <span class="day-number">${+dayNumber}</span>
              <span class="month">${dateCodes.month[monthNumber].slice(0,3)},</span>
              <span class="day-week">${dayWeekFinal}</span>
      </div>
    </li>
    `
    cardList.push(li);
  }


  element.innerHTML = `
  <div class="main-container">
    <section>
      <div class="upside">
        <div class="title">
          <h5>Forecasts</h5>
        </div>
        <div class="day-filter">
          <button id="threeDaysBtn" class="selectedBtn">3 Days</button>
          <button id="tenDaysBtn">10 Days</button>
        </div>
      </div>
      
      <ul class="forecastbyday ten hidden">
        ${cardList.join("")}
      </ul>

      <ul class="forecastbyday three">
        ${cardList.filter((item, index)=> (index <= 2)).join("")}
      </ul>
      
    </section>
  </div>
 `;

 //
 let selectedView = "ten";
 const threeContainer = document.querySelector(".forecastbyday.three")
 const tenContainer = document.querySelector(".forecastbyday.ten")
 const threeDaysButton = document.querySelector("#threeDaysBtn");
 const tenDaysButton = document.querySelector("#tenDaysBtn");

 function switchForm(e) {
  selectedView = selectedView === "ten" ? "three" : "ten";
  const selectedButton = e.target;

  if(selectedButton.id == "threeDaysBtn") {
    tenContainer.classList.add("hidden");
    threeContainer.classList.remove("hidden");
    threeDaysButton.classList.add("selectedBtn");
    tenDaysButton.classList.remove("selectedBtn");
  } else {
    threeContainer.classList.add("hidden");
    tenContainer.classList.remove("hidden");
    tenDaysButton.classList.add("selectedBtn");
    threeDaysButton.classList.remove("selectedBtn");
  }

  // const buttons = document.querySelectorAll(".day-filter button");
  // buttons.forEach((button) => {
  //   button.classList.remove("selectedBtn");
  //   selectedButton.classList.add("selectedBtn")
  // });

 }


 threeDaysButton.addEventListener("click",switchForm);
 tenDaysButton.addEventListener("click",switchForm);

};

export default Forecast;
