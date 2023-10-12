import "./Rainfall.css";

const Rainfall = async (element, data) => {
  const currentDate = new Date();
  const currentHour = currentDate.getHours();
  const rfArray = [];
  const hours = currentHour + 5;
  const rf = data.hourly.precipitation_probability[currentHour];
  const rainfallList = data.hourly.precipitation_probability.filter((item,index)=>{
    return ((currentHour <= index) && (currentHour +5 >= index)) ;
  })
  console.log(rf);
  function colorPicker(rf) {
    const rfColor = ["#77BEFF", "#2898FF", "#0472D9", "#032F9E", "#010E52"];
    const colorRfs = document.querySelectorAll(".card-rf");
    const iconColor = document.querySelector(".color-rf");
    const title = document.querySelector(".color2-rf");
    const textInfo = document.querySelector(".info-text-rf");

    let color =
        rf >= 0 && rf <= 20? rfColor[0]
        : rf > 20 && rf <= 40? rfColor[1]
        : rf > 40 && rf <= 60? rfColor[2]
        : rf > 60 && rf <= 80? rfColor[3]
        : rf > 80 && rf <= 100? rfColor[4]
        : "#3CD087";
    const colors = rainfallList.map((item) => {
        return item >= 0 && item <= 20? rfColor[0]
        : item > 20 && item <= 40? rfColor[1]
        : item > 40 && item <= 60? rfColor[2]
        : item > 60 && item <= 80? rfColor[3]
        : item > 80 && item <= 100? rfColor[4]
        : "#3CD087";
    });
    colorRfs.forEach((colorRf,index)=>{
        colorRf.style.backgroundColor = colors[index];
    })
    
    iconColor.style.color = color;
    title.style.color = color;
    title.textContent =
        rf >= 0 && rf <= 20? "Dry (0-20%)"
        : rf > 20 && rf <= 40? "Low (20-40%)"
        : rf > 40 && rf <= 60? "Moderate (40-60%)"
        : rf > 60 && rf <= 80? "High (60-80%)"
        : rf > 80 && rf <= 100? "Heavy (80-100%)"
        : "null";
    textInfo.textContent =
        rf >= 0 && rf <= 20? "A perfect time for a walk!"
        : rf > 20 && rf <= 40? "You might consider taking your umbrella."
        : rf > 40 && rf <= 60? "You might consider taking your umbrella."
        : rf > 60 && rf <= 80? "Bring your umbrella!"
        : rf > 80 && rf <= 100? "Bring your umbrella!"
        : "null";
  }

  for (let i = currentHour; i <= hours; i++) {
    let hour = new Date(data.hourly.time[i]).getHours();
    hour = hour < 12 ? `${hour} am` : hour === 12 ? `${hour} pm` : `${hour - 12} pm`;
    let rainfall = data.hourly.precipitation_probability[i];
    const liElement = `
        <li class="card-rf" >
        <span class="degree">${rainfall}%</span>
        <span class="units">${hour}</span>
        </li>
    `;
    rfArray.push(liElement);
  }

  element.innerHTML = `
    <div class="rf-info">
        <div class="info-box">
            <span class="title-rf">Rainfall</span>
            <div class="order">
                <i class="fi fi-rr-cloud-rain color-rf"></i>
                <div class="order2">
                    <span class="info-title-rf color2-rf"></span>
                    <span class="info-text-rf"></span>
                </div>
            </div>
        </div>
        <ul class="card-list-rf">
        ${rfArray.join(" ")}
        </ul>
    </div>
    `;

  colorPicker(rf);
  return rfArray.join(" ");
};

export default Rainfall;