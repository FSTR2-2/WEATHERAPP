import "./Navbar.css";

async function getData(url) {
  const data1 = fetch(
    "https://geocoding-api.open-meteo.com/v1/search?name=Berlin&count=10&language=en&format=json"
  )
    .then((response) => response.json())
    .then((data) => {
      return data;
    });
  return data1;
}


const Navbar = async (element) => {
  const data = await getData();

  // console.log(data);

  element.innerHTML = `
  <div class="main">
  <i class="fi fi-rr-apps app"> </i>
  <i class="fi fi-rr-marker marker"></i>
  <i class="fi fi-rr-map map"></i>
  <a class="coffe" href="https://www.buymeacoffee.com/vetheksys" target="_blank"><i class="fi fi-rr-mug-hot"></i></a>
  </div>
  `;
};

export default Navbar;