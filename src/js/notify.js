import { refs } from './refs/refs';

const { modalError, modalErrorText } = refs().modalErrorRef;

const delay = 3000;
let timeoutID = null;

modalError.addEventListener('click', onAttentionClick);

function onAttentionClick() {
  hideError();
  clearInterval(timeoutID);
}

export function notify(text) {
  modalError.classList.remove('is-hidden');

  attentionText(text);

  timeoutID = setTimeout(() => {
    hideError();
  }, delay);
}

function hideError() {
  modalError.classList.add('is-hidden');
}

function attentionText(text) {
  modalErrorText.innerHTML = `${text}`;
}
