import './ThemeSwitch.css'

const ThemeSwitch = (element) => {
 element.innerHTML = `
  <div class="darkmode-btn">
    <div class="cycle"></div>
  </div>
 `;

  const darkmodeBtn = document.querySelector('.darkmode-btn');
  const darkmodeCycle = darkmodeBtn.querySelector('.cycle')

  darkmodeBtn.addEventListener('click', handleDarkMode)

 function handleDarkMode() {
  console.log(darkmodeBtn, darkmodeCycle)
  darkmodeBtn.classList.toggle('active')

 }

 
}


export default ThemeSwitch;