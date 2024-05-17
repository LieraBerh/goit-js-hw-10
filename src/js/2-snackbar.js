const formElem = document.querySelector('.form');

formElem.addEventListener('submit', promise);

const promise = new Promise((resolve, reject) => {
  setTimeout(() => {
    if (condition) {
      resolve();
    } else {
      reject();
    }
  }, timeout);
});
