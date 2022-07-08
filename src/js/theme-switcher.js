import { refs } from './refs/refs';
const { switcherBtn } = refs().panel;
import {
  getStorageSetting,
  setStorageSetting,
} from './storage/storage-settings';

if (getStorageSetting().theme) {
  switcherBtn.checked = true;
  document.body.classList.add('theme-dark');
}

switcherBtn.addEventListener('change', function toggleTheme() {
  document.body.classList.toggle('theme-dark');
  checkTheme();
});

function checkTheme() {
  if (document.body.classList.contains('theme-dark')) {
    setStorageSetting('theme', true);
  } else {
    setStorageSetting('theme', false);
  }
}
