import "./DegreeSwitch.css";

const DegreeSwitch = (element) => {

	let degreeType;

	function renderElement() {
		degreeType = JSON.parse(localStorage.getItem("degreeType"));

		element.innerHTML = `
  <button id="degreeBtn">
    <div id="toggleKey" class="${degreeType === 'C' ? 'left' : 'right'}"></div>
    <span id="celsiusSide" class="degree-btn ${
		degreeType === "C" && "selected" 
	}">&degC</span>
    <span id="fahrenheitSide" class="degree-btn ${
		degreeType === "F" && "selected" 
	}">&degF</span>
  </button>
 `;
	}

	renderElement();

	const toggleBtn = document.querySelector("#degreeBtn");
	toggleBtn.addEventListener("click", handleDegreeToggle);

	
	function handleDegreeToggle() {
		if (degreeType === "F") {
			localStorage.setItem("degreeType", JSON.stringify("C"));
		} else {
			localStorage.setItem("degreeType", JSON.stringify("F"));
		}
		
		// const toggleKey = document.querySelector('#toggleKey')
		// toggleKey.style.left = degreeType === 'C' ? '0' : '43%'

		const toggleDegreeTypeEvent = new CustomEvent("toggleDegree", {
			detail: { degreeType },
		});

		document.dispatchEvent(toggleDegreeTypeEvent);

		renderElement();
	}
};

export default DegreeSwitch;
