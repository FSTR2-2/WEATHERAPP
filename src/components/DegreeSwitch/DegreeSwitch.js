import "./DegreeSwitch.css";

const DegreeSwitch = (element) => {
	let degreeType = JSON.parse(localStorage.getItem("degreeType"));

	if (!degreeType) {
		localStorage.setItem("degreeType", JSON.stringify("C"));
		degreeType = JSON.parse(localStorage.getItem("degreeType"));
	}

	element.innerHTML = `
		<div id="degreeToggle" class=${degreeType === "C" ? "active" : ""}>
			<div id="degreeCycle"></div>
			<span class=${degreeType === "C" ? "active" : ""}>&deg;C</span>
			<span class=${degreeType === "F" ? "active" : ""}>&deg;F</span>
		</div>
	`;

	const degreeToggle = document.querySelector("#degreeToggle");
	const degreeLetters = degreeToggle.querySelectorAll("span");

	degreeToggle.addEventListener("click", handleDegreeToggle);

	function handleDegreeToggle() {
		degreeToggle.classList.toggle("active");
		degreeLetters.forEach((letter) => {
			letter.classList.toggle("active");
		});

		const itemToSet = degreeType === "C" ? "F" : "C";
		localStorage.setItem("degreeType", JSON.stringify(itemToSet));

		const toggleDegreeTypeEvent = new CustomEvent("toggledegree", {
			detail: { degreeType },
		});

		setTimeout(() => {
			document.dispatchEvent(toggleDegreeTypeEvent);
		}, 250)
	}
};

export default DegreeSwitch;
