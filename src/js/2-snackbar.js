console.log('hello');

const formElem = document.querySelector('.form');

formElem.addEventListener('submit', createPromise);

const userDelay = formElem.elements.delay.value;

function createPromise(params) {
  const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
      if (condition) {
        resolve();
      } else {
        reject();
      }
    }, userDelay);
  });
}
