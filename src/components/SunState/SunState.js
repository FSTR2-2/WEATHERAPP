import "./SunState.css";

const SunState = (element, data) => {
	const currentDate = {
		sunrise: {
			hour: new Date(data.daily.sunrise[0]).getHours(),
			minute: new Date(data.daily.sunrise[0]).getMinutes(),
		},
		sunset: {
			hour: new Date(data.daily.sunset[0]).getHours(),
			minute: new Date(data.daily.sunset[0]).getMinutes(),
		},
	};
	console.log(currentDate);

	element.innerHTML = `
    <div class="sunstate-container">
      <div class="inner-container">
        <header>Sunrise</header>
        <div>
          <i class="fi fi-rr-sunrise-alt"></i>
          <p>
            ${currentDate.sunrise.hour}:${currentDate.sunrise.minute}<span>am</span>
          </p>
        </div>
      </div>
      <div class="inner-container">
        <header>Sunset</header>
        <div>
          <i class="fi fi-rr-sunset"></i>
          <p>
            ${currentDate.sunset.hour}:${currentDate.sunset.minute}<span>pm</span>
          </p>
        </div>
      </div>
    </div>
  `;
};

export default SunState;
