 // flatpickr import
import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";

 // Notify import
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import "notiflix/dist/notiflix-3.2.6.min.css";

// Refs
const inputRef = document.getElementById('datetime-picker');
const startBtnRef = document.querySelector('button[data-start]');
const spanDaysRef = document.querySelector('span[data-days]');
const spanHoursRef = document.querySelector('span[data-hours]');
const spanMinutesRef = document.querySelector('span[data-minutes]');
const spanSecondsRef = document.querySelector('span[data-seconds]');

startBtnRef.disabled = true;
  
 // flatpickr call
const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
      onClose(selectedDates) {
        if ((new Date().getTime() - selectedDates[0].getTime()) > 0)
        { Notify.warning("Please choose a date in the future"); }
        else {startBtnRef.disabled = false}
      },
  };
flatpickr(inputRef, options); 

let timerId = 0;

// Countdown timer start by click
startBtnRef.addEventListener('click', () => {
  timerId = setInterval(onTimer, 1000);
});

function onTimer() {
  startBtnRef.disabled = true;
  inputRef.disabled = true;
  const selectedDateMs = new Date(inputRef.value);//selected Date-Time in ms 
  const currentDateMs = Date.now();//current Date-Time in ms
  const deltaTimeMs = selectedDateMs - currentDateMs;//remained time in ms
  
  updateTimerBoard(deltaTimeMs);
  if (deltaTimeMs <= 0) {
    clearInterval(timerId);
    updateTimerBoard(0);
    // startBtnRef.disabled = false;
    // inputRef.disabled = false;
    }
  }

function updateTimerBoard(timeMs) {
const { days, hours, minutes, seconds } = convertMs(timeMs);
  spanDaysRef.textContent = days;
  spanHoursRef.textContent = hours;
  spanMinutesRef.textContent = minutes;
  spanSecondsRef.textContent = seconds;
}

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = addLeadingZero(Math.floor(ms / day));
  // Remaining hours
  const hours = addLeadingZero(Math.floor((ms % day) / hour));
  // Remaining minutes
  const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));
  // Remaining seconds
  const seconds = addLeadingZero(Math.floor((((ms % day) % hour) % minute) / second));

  return { days, hours, minutes, seconds };
}