 // flatpickr import
import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";

 // Notify import
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import "notiflix/dist/notiflix-3.2.6.min.css";
// Notify.success('Sol lucet omnibus');
// Notify.failure('Qui timide rogat docet negare');
// Notify.warning('Memento te hominem esse');
// Notify.info('Cogito ergo sum');

let selectedDayTimeMs = 0;
let timerId = 0;

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
        selectedDayTimeMs = selectedDates[0].getTime();//selected Unix(time and date) in ms
        console.log('selectedDayTimeMs :>> ', selectedDayTimeMs);
        console.log('nowdateMs ', options.defaultDate.getTime());
        if ((new Date().getTime() - selectedDates[0].getTime()) > 0) { Notify.warning("Please choose a date in the future"); }
        else {startBtnRef.disabled = false}
      },
  };
flatpickr(inputRef, options); 

// Countdown timer start by click
startBtnRef.addEventListener('click', () => {
  timerId = setInterval(countDownDayTime, 1000);
});

function countDownDayTime() {
const currentDayTimeMs = Date.now();
const deltaTime = selectedDayTimeMs - currentDayTimeMs;
// console.log(deltaTime);
  updateDataTimeFace(deltaTime);
  
  if (deltaTime <= 0) {
    clearInterval(timerId);
    updateDataTimeFace(0);
    startBtnRef.disabled = true;
  }
}

function updateDataTimeFace(timeMs) {
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