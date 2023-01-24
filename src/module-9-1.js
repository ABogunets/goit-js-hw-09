// * Timer-from Repeta Web1
// const timer = {
//   start() {
//     const startTime = Date.now();

//     setInterval(() => {
//       const currentTime = Date.now();
//       const deltaTime = currentTime - startTime;
//       const { hours, mins, secs } = getTimeComponents(deltaTime);

//       console.log(`${hours}:${mins}:${secs}`);
//     }, 1000);
//   },
// };

// timer.start();

// function pad(value) {
//   return String(value).padStart(2, "0");
// }

// function getTimeComponents(time) {
//   const hours = pad(Math.floor((time % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)));
//   const mins = pad(Math.floor((time % (1000 * 60 * 60)) / (1000 * 60 )));
//   const secs = pad(Math.floor((time % (1000 * 60)) / 1000));
//   return { hours, mins, secs };
// }
// * New Year Timer-from Lecture
// Написати таймер зворотнього відліку до Нового року який можна зупиняти при кліку на кнопку **Stop**
const timeEl = document.getElementById("time");
const stopBtnEl = document.getElementById("stopBtn");
const continueBtnEl = document.getElementById("continueBtn");

/* New year - 1 січня 00:00 2024
today - 23 січня 21:38 2023


  будемо використовувати setInterval() для роботи лічільника
  1. від Нового року відняти поточну дату - таким чином ми отримаємо різницю в часі (будемо працювати з мілісекундами)
  2. з тих мілісекунд, що отримали у кроці 1 витягнемо кількість днів, годин, хвилин і секунд, які лишились до Нового року
  3. показати ці дані користувачу на сторінці
*/
let isTimerRun = true;
const newYearDate = new Date(`Jan 1, ${new Date().getFullYear() + 1}`);

countDownTimeToNY();
let timerId = setInterval(countDownTimeToNY, 1000);

stopBtnEl.addEventListener('click', () => {
  stopInterval();
  if (!isTimerRun) {
  continueBtnEl.disabled = false;
  continueBtnEl.addEventListener('click', continueInterval);
  };
});

function countDownTimeToNY() {
  const now = Date.now();
  // const now1 = new Date().getTime();
  const diff = newYearDate - now;//скільки мілісекунд залишилось до нового року
  
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const minutes= Math.floor((diff / (1000 * 60)) % 60);
  const seconds = Math.floor((diff / 1000) % 60);

  timeEl.textContent = `${days} d. ${hours} h. ${minutes} m. ${seconds} s.`;
  
  if (diff <= 0) {
    stopInterval();
    timeEl.textContent = 'Happy New Year!';
  }

}

function continueInterval() {
  isTimerRun = true;
  continueBtnEl.disabled = true;
  alert("Continue");
  timerId = setInterval(countDownTimeToNY, 1000);
}

function stopInterval() {
  isTimerRun = false;
  clearInterval(timerId);
  alert('The timer has been stopped!');
}
