import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const formElem = document.querySelector('.form');

formElem.addEventListener('submit', createPromise);

function createPromise(event) {
  event.preventDefault();

  const delayInput = document.querySelector('input[name="delay"]');
  const delay = parseInt(delayInput.value);

  const stateInput = document.querySelector('input[name="state"]:checked');
  const state = stateInput ? stateInput.value : null;

  const promise = new Promise((resolve, reject) => {
    if (state === 'fulfilled') {
      setTimeout(() => {
        resolve(delay);
      }, delay);
    } else if (state === 'rejected') {
      setTimeout(() => {
        reject(delay);
      }, delay);
    }
  });

  promise
    .then(delay => {
      iziToast.success({
        title: 'Success',
        message: `Fulfilled promise in ${delay}ms`,
        backgroundColor: 'rgba(89, 161, 13, 1)',
        titleColor: 'white',
        messageColor: 'white',
        iconColor: 'white',
        iconUrl: '../img/bi_check2-circle.svg',
      });
    })
    .catch(delay => {
      iziToast.error({
        title: 'Error',
        message: `Rejected promise in ${delay}ms`,
        backgroundColor: 'rgba(239, 64, 64, 1)',
        titleColor: 'white',
        messageColor: 'white',
        iconUrl: '../img/bi_x-octagon.svg',
      });
    });
}
