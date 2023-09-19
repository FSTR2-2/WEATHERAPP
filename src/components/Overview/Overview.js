import AirQuality from './AirQuality/AirQuality';

const Overview = (element) => {
 element.innerHTML = `
  <div class="main-container">
  Overview
   <div id="airQuality" class="container"></div>
  </div>

 `;
}

export default Overview;