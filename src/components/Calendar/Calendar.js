import "./Calender.css";


const Calendar = (element) => {
    const daysInMonth = new Date().getDate();
    const currentDay = new Date().getDay();
    const monthNames = [
      'January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December'
    ];
    const currentDate = new Date();
    const month = monthNames[currentDate.getMonth()];
  
    const calendarHTML = `
      <div class="calendar">
        <div class="month">${month}</div>
        <div class="days" id="days"></div>
      </div>
    `;


    const selectedDateDisplay = document.createElement('div');
    selectedDateDisplay.id = 'selectedDateDisplay';
    element.appendChild(selectedDateDisplay);

  function updateSelectedDateDisplay() {
    if (selectedDate) {
      const options = { year: 'numeric', month: 'long', day: 'numeric' };
      selectedDateDisplay.innerText = selectedDate.toLocaleDateString(undefined, options);
    } else {
      selectedDateDisplay.innerText = 'No date selected';
    }
  }
  
    element.innerHTML = calendarHTML;
  
    const daysElement = element.querySelector('#days');

    let selectedDate = new Date(); // Initialize with the current date

  
    function createCalendar() {
      const daysInMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate();
  
      daysElement.innerHTML = '';

      const currentDay = new Date().getDate();
      const firstHighlightedDay = Math.max(currentDay, 1);
      const lastHighlightedDay = Math.min(currentDay + 9, daysInMonth);
  
      for (let i = 1; i <= daysInMonth; i++) {
        const dayElement = document.createElement('div');
        dayElement.classList.add('day');
        dayElement.innerText = i;


  
        if (i === new Date().getDate() && currentDate.getMonth() === new Date().getMonth()) {
            dayElement.classList.add('current-day');
          } else if (i >= firstHighlightedDay && i <= lastHighlightedDay) {
            dayElement.classList.add('highlighted-day');
          }
      
  
        daysElement.appendChild(dayElement);
      }
       
    }

    function registerDayClickEvents() {
        const daysElement = element.querySelector('.days');  // Update to target the correct element
        daysElement.addEventListener('click', (event) => {
          const dayElement = event.target;
          if (dayElement.classList.contains('highlighted-day') || dayElement.classList.contains('current-day')) {
            const index = Array.from(daysElement.children).indexOf(dayElement);
            selectedDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), index + 1);
            updateSelectedDateDisplay(selectedDate);
      
            // Remove previously selected day highlight
            const previouslySelectedDay = daysElement.querySelector('.selected-day');
            if (previouslySelectedDay) {
              previouslySelectedDay.classList.remove('selected-day');
            }
      
            // Highlight the newly selected day
            dayElement.classList.add('selected-day');
          }
        });
      }
      
      createCalendar();
      updateSelectedDateDisplay();
      registerDayClickEvents();
  };

export default Calendar;