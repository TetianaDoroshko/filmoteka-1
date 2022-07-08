import { refs } from './refs/refs';

let upArrowRef;
upArrowRef = refs().upArrowRef;

window.addEventListener('scroll', HideElementOnScroll);
upArrowRef.upArrow.addEventListener('click', ScrollToTop);

function HideElementOnScroll() {
  if (window.scrollY > 800) {
    upArrowRef.upArrow.classList.remove('is-hidden');
  } else {
    upArrowRef.upArrow.classList.add('is-hidden');
  }
}

function ScrollToTop() {
  window.scrollTo({
    top: 0,
    behavior: 'smooth',
  });
}
