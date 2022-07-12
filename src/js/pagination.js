import { renderPagination } from './render/render-pagination';
import { refs } from './refs/refs';
import { getTrendingMovies } from './api-service/get-trending-movies';
import { getMoviesByKey } from './api-service/get-movies-by-key';
import {
  getSessionStorage,
  updatePageSessionStorage,
} from './storage/session-storage';
import storageConfig from './constants/storage-config';
import { renderMovies } from './render/render-gallery';
import { hideLoader, showLoader } from './loader/loader';
import { renderMoviesPromises } from './btn-library';

const { moviesDiv } = refs().galleryRef;
const { TRENDING, BY_KEY, LIBRARY } = storageConfig;

//==================================================
// const { btnWatched, btnQueue } = refs().libraryButtonsRef;
// btnWatched.addEventListener('click', () => {
//   createPagination(200, 1);
//   setSessionStorage(BY_KEY, 'game');
//   console.log('1');
// });

// btnQueue.addEventListener('click', () => {
//   createPagination(100, 1);
//   setSessionStorage(TRENDING);
//   console.log('2');
// });
//==================================================

const {
  paginationRef: { container },
} = refs();

let paginationRef;
let currentPage = 1;
let totalPage;

// createPagination(200);

window.addEventListener(`resize`, onResize);

function onResize() {
  if (!paginationRef) {
    return;
  }

  if (
    window.matchMedia('(max-width: 767px)').matches &&
    !paginationRef.container.classList.contains('mobile-js')
  ) {
    paginationRef.container.classList.remove('desktop-js');
    paginationRef.container.classList.add('mobile-js');
    createPagination(totalPage, currentPage);
  } else if (
    window.matchMedia('(min-width: 768px)').matches &&
    !paginationRef.container.classList.contains('desktop-js')
  ) {
    paginationRef.container.classList.remove('mobile-js');
    paginationRef.container.classList.add('desktop-js');
    createPagination(totalPage, currentPage);
  }
}

export function createPagination(totalPagination, page) {
  totalPage = totalPagination;
  updatePageSessionStorage(page);
  if (totalPagination <= 1) {
    clearContainerPagination();
    return;
  }

  if (page) {
    currentPage = page;
  }

  renderPagination(totalPagination);
  paginationRef = refs().paginationRef;
  activeCurrentPage();
  checkCurrentPosition();
  lockBtn();
  paginationRef.paginationList.addEventListener('click', onClick);
}

function onClick(e) {
  e.preventDefault();

  if (!e.target.classList.contains('pagination__item')) {
    return;
  }

  if (e.target.classList.contains('js-page')) {
    currentPage = Number(e.target.dataset.num);
  }

  if (e.target.classList.contains('prev-js') && currentPage > 1) {
    currentPage -= 1;
  }

  if (e.target.classList.contains('next-js') && currentPage < totalPage) {
    currentPage += 1;
  }

  if (e.target.classList.contains('first-js')) {
    currentPage = 1;
    reRenderPagination();
  }

  if (e.target.classList.contains('last-js')) {
    currentPage = totalPage;
    reRenderPagination();
  }

  if (e.target.classList.contains('prevMore-js')) {
    currentPage = +paginationRef.pages[1].dataset.num;
    reRenderPagination();
  }

  if (e.target.classList.contains('nextMore-js')) {
    currentPage =
      +paginationRef.pages[paginationRef.pages.length - 2].dataset.num;
    reRenderPagination();
  }

  renderPage(currentPage);

  activeCurrentPage();
  checkCurrentPosition();
  lockBtn();
  scroll();
  // console.log(currentPage);
}

async function renderPage(page) {
  updatePageSessionStorage(page);
  const currentQuery = getSessionStorage();
  let data;
  showLoader();
  if (currentQuery[TRENDING]) {
    data = await getTrendingMovies(page);
    renderMovies(data);
  }

  if (currentQuery[BY_KEY]) {
    const query = currentQuery[BY_KEY];
    data = await getMoviesByKey(query, page);
    renderMovies(data);
  }

  if (currentQuery[LIBRARY]) {
    renderMoviesPromises(page);
  }
  hideLoader();
  // console.log(data);
}

function activeCurrentPage() {
  paginationRef.pages.forEach(item => {
    item.classList.remove('active');

    if (+item.dataset.num === currentPage) {
      item.classList.add('active');
    }
  });
}

function checkCurrentPosition() {
  if (window.matchMedia('(min-width: 768px)').matches) {
    if (totalPage > 9) {
      togglePrePagination();
      togglePostPagination();

      if (currentPage >= 4 && currentPage <= totalPage) {
        reRenderPagination();
      }
      // activeCurrentPage();
    }
  } else {
    if (totalPage > 5) {
      if (currentPage >= 2 && currentPage <= totalPage) {
        reRenderPagination();
      }
    }
  }
  activeCurrentPage();
}

function togglePrePagination() {
  if (currentPage <= 5) {
    paginationRef.first.classList.add('is-hidden');
    paginationRef.prevMore.classList.add('is-hidden');
    paginationRef.pages[0].classList.remove('is-hidden');
    paginationRef.pages[1].classList.remove('is-hidden');
  } else {
    paginationRef.first.classList.remove('is-hidden');
    paginationRef.prevMore.classList.remove('is-hidden');
    paginationRef.pages[0].classList.add('is-hidden');
    paginationRef.pages[1].classList.add('is-hidden');
  }
}

function togglePostPagination() {
  const indexLastIttem = paginationRef.pages.length - 1;

  if (currentPage >= totalPage - 4) {
    paginationRef.last.classList.add('is-hidden');
    paginationRef.nextMore.classList.add('is-hidden');
    paginationRef.pages[indexLastIttem - 1].classList.remove('is-hidden');
    paginationRef.pages[indexLastIttem].classList.remove('is-hidden');
  } else {
    paginationRef.last.classList.remove('is-hidden');
    paginationRef.nextMore.classList.remove('is-hidden');
    paginationRef.pages[indexLastIttem - 1].classList.add('is-hidden');
    paginationRef.pages[indexLastIttem].classList.add('is-hidden');
  }
}

function reRenderPagination() {
  let firstNum = currentPage - 4;

  if (currentPage <= 1) {
    firstNum = currentPage;
  } else if (currentPage <= 2) {
    firstNum = currentPage - 1;
  } else if (currentPage <= 3) {
    firstNum = currentPage - 2;
  } else if (currentPage <= 4) {
    firstNum = currentPage - 3;
  }

  if (currentPage >= totalPage) {
    firstNum = currentPage - 8;
  } else if (currentPage >= totalPage - 1) {
    firstNum = currentPage - 7;
  } else if (currentPage >= totalPage - 2) {
    firstNum = currentPage - 6;
  } else if (currentPage >= totalPage - 3) {
    firstNum = currentPage - 5;
  }

  if (window.matchMedia('(max-width: 767px)').matches) {
    firstNum = currentPage - 2;

    if (currentPage <= 1) {
      firstNum = currentPage;
    } else if (currentPage <= 2) {
      firstNum = currentPage - 1;
    }

    if (currentPage >= totalPage) {
      firstNum = currentPage - 4;
    } else if (currentPage >= totalPage - 1) {
      firstNum = currentPage - 3;
    } else if (currentPage >= totalPage - 2) {
      firstNum = currentPage - 2;
    }
  }

  for (
    let i = firstNum, j = 0;
    j < paginationRef.pages.length;
    i += 1, j += 1
  ) {
    paginationRef.pages[j].firstElementChild.textContent = i;
    paginationRef.pages[j].dataset.num = i;
  }
}

function lockBtn() {
  if (currentPage <= 1) {
    paginationRef.prev.classList.add('disabled');
  } else {
    paginationRef.prev.classList.remove('disabled');
  }

  if (currentPage >= totalPage) {
    paginationRef.next.classList.add('disabled');
  } else {
    paginationRef.next.classList.remove('disabled');
  }
}

export function clearContainerPagination() {
  container.innerHTML = '';
  totalPage = 0;
}

function scroll() {
  const { top } = moviesDiv.getBoundingClientRect();
  // console.log(top);

  window.scrollBy({
    top: top,
    behavior: 'smooth',
  });
}
