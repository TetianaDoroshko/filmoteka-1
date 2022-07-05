// возвращает разметку кнопок в шапке на стр библиотеки
import { refs } from '../refs/refs';

refs().libraryRef.libBtn.addEventListener('click', showButtonsLibrary);
refs().libraryRef.homeBtn.addEventListener('click', showSearchLabel);

const btnWatch = refs().libraryButtonsRef.btnWatched;
const btnQue = refs().libraryButtonsRef.btnQueue;
function showButtonsLibrary() {
  btnQue.classList.remove('is-hidden');
  btnWatch.classList.remove('is-hidden');
}

function showSearchLabel() {
  btnQue.classList.add('is-hidden');
  btnWatch.classList.add('is-hidden');
}
