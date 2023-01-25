
const startBtn = document.querySelector('button[data-start]');
const stopBtn = document.querySelector('button[data-stop]');
const bodyEl = document.querySelector('body');

startBtn.disabled = false;
stopBtn.disabled = true;

let timerId = null;

startBtn.addEventListener("click", onStartClick);
stopBtn.addEventListener("click", onStopClick);

function onStartClick() {
  timerId = setInterval(() => {
    startBtn.disabled = true;
    stopBtn.disabled = false;
    bodyEl.style.backgroundColor = getRandomHexColor();
  }, 1000);
}

function onStopClick() {
  startBtn.disabled = false;
  stopBtn.disabled = true;
  clearInterval(timerId);
  console.log('Timer stopped');
}

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}
