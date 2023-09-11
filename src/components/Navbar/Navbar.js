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
  <div>
   Navbar
  </div>
 `;
};

export default Navbar;
