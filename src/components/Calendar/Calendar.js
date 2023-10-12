import assets from "../../assets/assets";
import "./Calendar.css";

const Calendar = (element) => {
	element.innerHTML = `
    <div class="wrapper">
      <header>
        <p class="current-date">September 2023</p>
      </header>
      <div class="calendar">
        <ul class="week-days">
          <li>Sun</li>
          <li>Mon</li>
          <li>Tue</li>
          <li>Web</li>
          <li>Thu</li>
          <li>Fri</li>
          <li>Sat</li>
        </ul>
        <ul class="days"></ul>
      </div>
    </div>
  `;

	const currentDate = document.querySelector(".current-date");
	const daysUl = document.querySelector(".days");
	let date = new Date(),
		currentYear = date.getFullYear(),
		currentMonth = date.getMonth();

	const months = [
		"January",
		"February",
		"March",
		"April",
		"May",
		"June",
		"July",
		"August",
		"September",
		"October",
		"November",
		"December",
	];

	const renderCalendar = () => {
		let firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();
		console.log(firstDayOfMonth);
		let lastDateOfMonth = new Date(
			currentYear,
			currentMonth + 1,
			0
		).getDate();
		let lastDayOfMonth = new Date(
			currentYear,
			currentMonth,
			lastDateOfMonth
		).getDay();
		let lastDateOfLastMonth = new Date(
			currentYear,
			currentMonth,
			0
		).getDate();
		let listOfDays = "";

		for (let i = firstDayOfMonth; i > 0; i--) {
			listOfDays += `<li class="day inactive">${
				lastDateOfLastMonth - i
			}</li>`;
		}

		for (let i = 1; i <= lastDateOfMonth; i++) {
			let isToday = i === date.getDate();
			if (isToday) {
				listOfDays += `
        <li class="day today">
          ${i}
          <img src=${assets.vectors.Today} />
        </li>`;
			} else {
				listOfDays += `<li class="day">${i}</li>`;
			}
		}

		for (let i = lastDayOfMonth; i < 6; i++) {
			listOfDays += `<li class="day inactive">${
				i - lastDayOfMonth + 1
			}</li>`;
		}

		currentDate.innerText = `${months[currentMonth]} ${currentYear}`;
		daysUl.innerHTML = listOfDays;
	};

	renderCalendar();
};

export default Calendar;
