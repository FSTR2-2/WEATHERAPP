import "./UvIndex.css"

const UvIndex = async (element, data) => {

  const currentDate = new Date();
  const currentHour = currentDate.getHours();
  const uvArray = [];
  const hours = currentHour + 5;
  const uv = data.hourly.uv_index[currentHour];
  const uvindexList = data.hourly.uv_index.filter((item,index)=>{
    return ((currentHour <= index) && (currentHour +5 >= index)) ;
  })

  function colorPicker(uv){
    const uvColor = ["#3CD087","#F97F2A","#EF4902","#964b00","#6b0063"];
    const colorUvs = document.querySelectorAll(".card-uv");
    const iconColor = document.querySelector(".color-uv");
    const title = document.querySelector(".color2-uv");
    const textInfo = document.querySelector(".info-text-uv");
    
    const color = (
        uv >= 0 && uv <= 2 ? uvColor[0] :
        uv > 2 && uv <= 5 ? uvColor[1] :
        uv > 5 && uv <= 7 ? uvColor[2] :
        uv > 7 && uv <= 10 ? uvColor[3] :
        uv > 10 && uv <= 20 ? uvColor[4] :
        "#3CD087"
        );

    const colors = uvindexList.map((item)=>{
      return item >= 0 && item <= 2 ? uvColor[0] :
      item > 2 && item <= 5 ? uvColor[1] :
      item > 5 && item <= 7 ? uvColor[2] :
      item > 7 && item <= 10 ? uvColor[3] :
      item > 10 && item <= 20 ? uvColor[4] :
      "#3CD087"
    })
    colorUvs.forEach((colorUv,index) => {
      colorUv.style.backgroundColor = colors[index];
    });
    
    iconColor.style.color = color;
    title.style.color = color;
    title.textContent = (
        uv >= 0 && uv <= 2 ? "Good" :
        uv > 2 && uv <= 5 ? "Fair" :
        uv > 5 && uv <= 7 ? "Moderate" :
        uv > 7 && uv <= 10 ? "Poor" :
        uv > 10 && uv <= 20 ? "Very Poor" :
        "null"
        );
        textInfo.textContent = (
            uv >= 0 && uv <= 2 ? "A perfect time for a walk!" :
            uv > 2 && uv <= 5 ? "No more than 40 minutes of exposure." :
            uv > 5 && uv <= 7 ? "No more than 15 minutes of exposure." :
            uv > 7 && uv <= 10 ? "Avoid direct exposure!" :
            uv > 10 && uv <= 20 ? "Highly dangerous and carcinogenic!" :
            "null"
        );
  }


  for (let i = currentHour; i <= hours; i++) {
    let hour = new Date(data.hourly.time[i]).getHours();
    hour =hour < 12 ? `${hour} am` : hour === 12 ? `${hour} pm` : `${hour - 12} pm`;
    let uvindex = data.hourly.uv_index[i];
    const liElement = `
        <li class="card-uv" >
        <span class="degree">${uvindex}</span>
        <span class="units">${hour}</span>
        </li>
    `;
    uvArray.push(liElement);
  }
  
  element.innerHTML = `
    <div class="uv-info">
        <div class="info-box">
            <span class="title-uv">Uv Index</span>
            <div class="order">
                <i class="fi fi-rr-brightness color-uv"></i>
                <div class="order2">
                    <span class="info-title-uv color2-uv"></span>
                    <span class="info-text-uv"></span>
                </div>
            </div>
        </div>
        <ul class="card-list-uv">
        ${uvArray.join(" ")}
        </ul>
    </div>
    `;
    
    colorPicker(uv);
    return uvArray.join(" ");
};

export default UvIndex;