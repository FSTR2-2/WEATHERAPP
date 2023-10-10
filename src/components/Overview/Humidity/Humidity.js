import "./Humidity.css";

const Humidity = async (element, data) => {
  const currentDate = new Date();
  const currentHour = currentDate.getHours();
  const huArray = [];
  const hours = currentHour + 5;
  const hu = data.hourly.relativehumidity_2m[currentHour];
  const humidityList = data.hourly.relativehumidity_2m.filter((item,index) => {
    return ((currentHour <= index) && (currentHour +5 >= index)) ;
    
  })
  function colorPicker(hu) {
    const huColor = ["#FFD12E", "#77BEFF", "#3CD087", "#F97F2A", "#EF4902"];
    const colorHus = document.querySelectorAll(".card-hu");
    const iconColor = document.querySelector(".color-hu");
    const title = document.querySelector(".color2-hu");
    const textInfo = document.querySelector(".info-text-hu");
    
    const color = hu >= 0 && hu <= 20? huColor[0]
        : hu > 20 && hu <= 40? huColor[1]
        : hu > 40 && hu <= 60? huColor[2]
        : hu > 60 && hu <= 80? huColor[3]
        : hu > 80 && hu <= 100? huColor[4]
        : "#3CD087";

    const colors = humidityList.map((item) => {
        return item >= 0 && item <= 20? huColor[0]
        : item > 20 && item <= 40? huColor[1]
        : item > 40 && item <= 60? huColor[2]
        : item > 60 && item <= 80? huColor[3]
        : item > 80 && item <= 100? huColor[4]
        : "#3CD087";
        })

    colorHus.forEach((colorHu,index) => {
        colorHu.style.backgroundColor = colors[index];
    });
    iconColor.style.color = color;
    title.style.color = color;
    title.textContent =
        hu >= 0 && hu <= 20? "Dry (0-20%)"
        : hu > 20 && hu <= 40? "Low (20-40%)"
        : hu > 40 && hu <= 60? "Good (40-60%)"
        : hu > 60 && hu <= 80? "High (60-80%)"
        : hu > 80 && hu <= 100? "Very Humid (80-100%)"
        : "null";
    textInfo.textContent =
        hu >= 0 && hu <= 20? "People with diseases should pay attention."
        : hu > 20 && hu <= 40? "Attention to dry throat."
        : hu > 40 && hu <= 60? "Suitable for sports!"
        : hu > 60 && hu <= 80? "It can be uncomfortable."
        : hu > 80 && hu <= 100? "Asthma patients should be careful!"
        : "null";
  }

  for (let i = currentHour; i <= hours; i++) {
    let hour = new Date(data.hourly.time[i]).getHours();
    hour = hour < 12 ? `${hour} am` : hour === 12 ? `${hour} pm` : `${hour - 12} pm`;
    let humidity = data.hourly.relativehumidity_2m[i];
    const liElement = `
        <li class="card-hu" >
        <span class="degree">${humidity}%</span>
        <span class="units">${hour}</span>
        </li>
    `;
    huArray.push(liElement);
  }

  element.innerHTML = `
    <div class="hu-info">
        <div class="info-box">
            <span class="title-hu">Humidity</span>
            <div class="order">
                <i class="fi fi-rs-humidity color-hu"></i>
                <div class="order2">
                    <span class="info-title-hu color2-hu"></span>
                    <span class="info-text-hu"></span>
                </div>
            </div>
        </div>
        <ul class="card-list-hu">
        ${huArray.join(" ")}
        </ul>
    </div>
    `;

  colorPicker(hu);
  return huArray.join(" ");
};

export default Humidity;
