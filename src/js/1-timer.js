//#region imports
import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
//#endregion

const inputEl = document.querySelector('#datetime-picker');
const startBtn = document.querySelector('[data-start]');

startBtn.disabled = true;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    const selectedDate = new Date(selectedDates[0]);
    const currentDate = new Date();

    if (selectedDate <= currentDate) {
      startBtn.disabled = true;
      iziToast.error({
        title: 'Error',
        message: 'Please choose a date in the future',
        backgroundColor: 'rgba(239, 64, 64, 1)',
        titleColor: 'white',
        messageColor: 'white',
      });
    } else {
      startBtn.disabled = false;
    }
  },
};

const flatpickrInit = flatpickr(inputEl, options);

inputEl.addEventListener('click', () => {
  flatpickrInit.open();
});

let timerInterval;
startBtn.addEventListener('click', handleButtonClick);

function handleButtonClick() {
  const selectedDate = new Date(flatpickrInit.selectedDates[0]);
  const currentDate = new Date();
  const difference = selectedDate - currentDate;

  if (difference <= 0) {
    return;
  }

  startBtn.disabled = true;

  inputEl.disabled = true;

  timerInterval = setInterval(() => {
    const now = new Date();
    const remainingTime = selectedDate - now;

    if (remainingTime <= 0) {
      clearInterval(timerInterval);

      updateTimer(0, 0, 0, 0);

      inputEl.disabled = false;
      return;
    }

    const { days, hours, minutes, seconds } = convertMs(remainingTime);

    updateTimer(days, hours, minutes, seconds);
  }, 1000);
}

function updateTimer(days, hours, minutes, seconds) {
  document.querySelector('[data-days]').textContent = padZero(days);

  document.querySelector('[data-hours]').textContent = padZero(hours);

  document.querySelector('[data-minutes]').textContent = padZero(minutes);

  document.querySelector('[data-seconds]').textContent = padZero(seconds);
}

function padZero(num) {
  return (num < 10 ? '0' : '') + num;
}

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}
