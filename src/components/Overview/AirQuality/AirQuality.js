import "./AirQuality.css";



const AirQuality = async (element, data) => {
  console.log(data);
  const city = "istanbul";
  const currentDate = new Date();
  const currentHour = currentDate.getHours();
  const pm2_5 = data.hourly.pm2_5[currentHour];
  const pm10 = data.hourly.pm10[currentHour];
  const so2 = data.hourly.sulphur_dioxide[currentHour];
  const no2 = data.hourly.nitrogen_dioxide[currentHour];
  const o3 = data.hourly.ozone[currentHour];
  const co = data.hourly.carbon_monoxide[currentHour];
  const european_aqi = data.hourly.european_aqi[currentHour];

  function colorPicker(pm2_5,pm10,so2,no2,o3,co){
    const airColor = ["#50F0E6","#50CCAA","#F0E641","#FF5050","#960032","#7D2181"];
    const colorPm2 = document.getElementById("pm2_5");
    const colorpm10 = document.getElementById("pm10");
    const colorso2 = document.getElementById("so2");
    const colorno2 = document.getElementById("no2");
    const coloro3 = document.getElementById("o3");
    const colorco = document.getElementById("co");
    colorPm2.style.backgroundColor = (
        pm2_5 >= 0 && pm2_5 <= 10 ? airColor[0] :
        pm2_5 > 10 && pm2_5 <= 20 ? airColor[1] :
        pm2_5 > 20 && pm2_5 <= 25 ? airColor[2] :
        pm2_5 > 25 && pm2_5 <= 50 ? airColor[3] :
        pm2_5 > 50 && pm2_5 <= 75 ? airColor[4] :
        pm2_5 > 75 && pm2_5 <= 800 ? airColor[5] :
        "#3CD087"
        );
    colorpm10.style.backgroundColor = (
        pm10 >= 0 && pm10 <= 20 ? airColor[0] :
        pm10 > 20 && pm10 <= 40 ? airColor[1] :
        pm10 > 40 && pm10 <= 50 ? airColor[2] :
        pm10 > 50 && pm10 <= 100 ? airColor[3] :
        pm10 > 100 && pm10 <= 150 ? airColor[4] :
        pm10 > 150 && pm10 <= 1200 ? airColor[5] :
        "#3CD087"
        );
    colorso2.style.backgroundColor = (
        so2 >= 0 && so2 <= 100 ? airColor[0] :
        so2 > 100 && so2 <= 200 ? airColor[1] :
        so2 > 200 && so2 <= 350 ? airColor[2] :
        so2 > 350 && so2 <= 500 ? airColor[3] :
        so2 > 500 && so2 <= 750 ? airColor[4] :
        so2 > 750 && so2 <= 1250 ? airColor[5] :
        "#3CD087"
        );
    colorno2.style.backgroundColor = (
        no2 >= 0 && no2 <= 40 ? airColor[0] :
        no2 > 40 && no2 <= 90 ? airColor[1] :
        no2 > 90 && no2 <= 120 ? airColor[2] :
        no2 > 120 && no2 <= 230 ? airColor[3] :
        no2 > 230 && no2 <= 340 ? airColor[4] :
        no2 > 340 && no2 <= 1000 ? airColor[5] :
        "#3CD087"
        );
    coloro3.style.backgroundColor = (
        o3 >= 0 && o3 <= 50 ? airColor[0] :
        o3 > 50 && o3 <= 100 ? airColor[1] :
        o3 > 100 && o3 <= 130 ? airColor[2] :
        o3 > 130 && o3 <= 240 ? airColor[3] :
        o3 > 240 && o3 <= 380 ? airColor[4] :
        o3 > 380 && o3 <= 800 ? airColor[5] :
        "#3CD087"
        );
    colorco.style.backgroundColor = (
        co >= 0 && co <= 4.5 ? airColor[0] :
        co > 4.5 && co <= 9.5 ? airColor[1] :
        co > 9.5 && co <= 12.5 ? airColor[2] :
        co > 12.5 && co <= 15.5 ? airColor[3] :
        co > 15.5 && co <= 30.5 ? airColor[4] :
        co > 30.5 && co <= 50.5 ? airColor[5] :
        "#3CD087"
        );
  }

  function AQIcalc(european_aqi){
    const color= ["#50F0E6","#50CCAA","#F0E641","#FF5050","#960032"];
    const aqiColor = document.querySelector(".color");
    const aqiInfo = document.getElementsByClassName("info-text");
    aqiColor.style.color = (
        european_aqi >= 0 && european_aqi <=20 ? color[0]:
        european_aqi > 20 && european_aqi <=40 ? color[1]:
        european_aqi > 40 && european_aqi <=60 ? color[2]:
        european_aqi > 60 && european_aqi <=80 ? color[3]:
        european_aqi > 80 && european_aqi <=100 ? color[4]:
        "#3CD087"
    );
    aqiColor.textContent = (
        european_aqi >= 0 && european_aqi <=20 ? "Good":
        european_aqi > 20 && european_aqi <=40 ? "Fair":
        european_aqi > 40 && european_aqi <=60 ? "Moderate":
        european_aqi > 60 && european_aqi <=80 ? "Poor":
        european_aqi > 80 && european_aqi <=100 ? "Very Poor":
        "Null"
    );
    aqiInfo.textContent = (
        european_aqi >= 0 && european_aqi <=20 ? "A perfect day for a walk!":
        european_aqi > 20 && european_aqi <=40 ? "Be careful":
        european_aqi > 40 && european_aqi <=60 ? "You should wear a mask.":
        european_aqi > 60 && european_aqi <=80 ? "Don't leave if you don't have to":
        european_aqi > 80 && european_aqi <=100 ? "Don't leave if you don't have to":
        "Null"
    );
  }
  function getCardData(item){
    switch (item){
        case "pm2_5":
            return {
                degree:pm2_5,
                units:"PM2.5",
                id:"pm2_5",
            }
        case "pm10":
            return {
                degree:pm10,
                units:"PM10",
                id:"pm10",
            }
        case "so2":
            return {
                degree:so2,
                units:"SO2",
                id:"so2",
            }
        case "no2":
            return {
                degree:no2,
                units:"NO2",
                id:"no2",
            }
        case "o3":
            return {
                degree:o3,
                units:"O3",
                id:"o3",
            }
        case "co":
            return {
                degree:co,
                units:"CO",
                id:"co",
            }
    }
}
  const airQualityList = ["pm2_5","pm10","so2","no2","o3","co"]
  const airQualityListElements = airQualityList.map((item) => {
    const cardsData = getCardData(item);
    
    const liElement = `
        <li class="card" id=${cardsData.id}>
            <span class="degree">${cardsData.degree}</span>
            <span class="units">${cardsData.units}</span>
            <span class="bg-units"></span>
        </li>
    `
    return liElement;
})



  element.innerHTML = `
  <div class="Air-info">
    <div class="info-box">
        <span>Air Quality</span>
        <i class="fi fi-sr-wind color"></i>
        <span class="info-title color"></span>
        <span class="info-text"></span>
    </div>
    <ul class="card-list">
        ${airQualityListElements.join("")}
    </ul>

  </div>
 `;
 colorPicker(pm2_5,pm10,so2,no2,o3,co);
};

export default AirQuality;
