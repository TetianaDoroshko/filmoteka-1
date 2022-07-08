import { refs } from './refs/refs';
const { switcherBtn } = refs().panel;

switcherBtn.addEventListener('change', function toggleTheme() {
  document.body.classList.toggle('theme-dark');
});
