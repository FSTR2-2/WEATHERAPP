import "./ThemeSwitch.css";

const ThemeSwitch = (element) => {
	let darkMode = JSON.parse(localStorage.getItem("darkMode"));
	if (!darkMode) {
		darkMode = "active";
		localStorage.setItem("darkMode", JSON.stringify(darkMode));
	}

	element.innerHTML = `
  <div id="darkModeToggle" class="${darkMode}">
    <div class="indicator"></div>
  </div>
  
 `;

	const toggle = document.getElementById("darkModeToggle");
	toggle.onclick = function () {
		toggle.classList.toggle("active");
		darkMode = darkMode === "active" ? "passive" : "active";
    localStorage.setItem('darkMode', JSON.stringify(darkMode));
	};
};

export default ThemeSwitch;
