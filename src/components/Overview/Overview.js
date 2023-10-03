import "./Overview.css";

const Overview = (element) => {
  const navlist = ["Air-Quality", "UV-Index", "Rainfall", "Humidity"];
  
  let selectedItem = "Air-Quality";
  
  
  element.innerHTML = `
  <div class="main-container">
   <div class="upper-side">
   <div class="title">
    <h3>Overview</h3>
    </div>
      <nav>
        <ul>
        ${navlist
          .map((navitem) => {
            return `
            <li class="list-item navBarItem ${selectedItem === navitem ? `selected` : ``}">
              <button class="navBtn" value=${navitem}> 
                ${navitem.split("-").join(" ")}
              </button>
            </li>`;
          })
          .join(" ")}
        </ul>
      </nav>
    
   </div>
   <div id="airquality" class="o-bottom-side selected-container"></div>
   <div id="uvindex" class="o-bottom-side ">asd</div>
   <div id="rainfall" class="o-bottom-side ">fg</div>
   <div id="humidity" class="o-bottom-side ">1234</div>
  </div>
 `;
 const navButtons = document.querySelectorAll(".navBtn");

 function clickBtn(e){
  const button = e.target
  navButtons.forEach(item =>{
    item.parentElement.classList.remove("selected");
  })
  button.parentElement.classList.add("selected");
  selectedItem = button.value; //Air-Quality
  const selectedContainerId = button.value.split("-").join("").toLowerCase();
  const containerElements = document.querySelectorAll(".o-bottom-side");
  containerElements.forEach(item => {
    if(item.id !== selectedContainerId){
      item.classList.remove("selected-container");
    }else{
      item.classList.add("selected-container");
    }
  })
  
};
 navButtons.forEach(item => { 
   item.addEventListener("click",clickBtn);
 });
};

export default Overview;
