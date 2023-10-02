import "./Overview.css";

const Overview = (element) => {
  const navlist = ["Air Quality", "UV Index", "Rainfall", "Humidity"];
  const selectedItem = "Air Quality";
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
            <li class="list-item ${selectedItem === navitem ? `selected` : ``}">
              <button> 
                ${navitem}
              </button>
            </li>`;
          })
          .join(" ")}
        </ul>
      </nav>
    
   </div>
   <div id="airQuality" class="bottom-side"></div>
  </div>
 `;
};

export default Overview;
