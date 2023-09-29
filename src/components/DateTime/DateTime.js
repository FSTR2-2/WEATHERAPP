import { dateCodes } from "../../scripts/dateCodes";
import "./DateTime.css";

const DateTime = (element, data) => {
	const formattedDateString = new Date().toLocaleString("en-US", {
		timeZone: data.timezone,
	});

	const currentDate = new Date(formattedDateString);

	const weekDay = currentDate.getDay();
	const monthDay = currentDate.getDate();
	const month = currentDate.getMonth();
	const year = currentDate.getFullYear();
	const hour = currentDate.getHours();
	const minute = currentDate.getMinutes();

	element.innerHTML = `
  <div class="container">
    <div class="date-box">
      <p class="date">
        ${dateCodes.day[weekDay].slice(0, 3)}, 
        ${dateCodes.month[month].slice(0, 3)} ${monthDay}, 
        ${year}
      </p>
    </div>
    <div class="time-box">
      <p class="time">
        ${hour > 12 ? hour - 12 : hour}:${
		Math.floor(minute / 10) === 0 ? `0${minute}` : minute
	}<span>${hour < 12 ? "AM" : "PM"}</span>
      </p>
    </div>
  </div>
 `;
};

export default DateTime;
