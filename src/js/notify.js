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
  if (modalError.classList.contains('show-hide')) {
    onAttentionClick();
  }
  setTimeout(()=>{
  
  modalError.classList.remove('is-hidden');
  modalError.classList.add('show-hide');

  attentionText(text);

  timeoutID = setTimeout(() => {
    hideError();
  }, delay);
  
  },0)
}

function hideError() {
  modalError.classList.add('is-hidden');
  modalError.classList.remove('show-hide');
}

function attentionText(text) {
  modalErrorText.innerHTML = `${text}`;
}
