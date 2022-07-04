export function refs() {
  return {
    headerRef: {
      // ref: document.querySelector('.selector')
    },
    homeRef: {
      // ref: document.querySelector('.selector')
    },
    libraryButtonsRef: {
      btnWatched: document.querySelector('.js-btn-watched'),
      btnQueue: document.querySelector('.js-btn-queue'),
    },
    paginationRef: {
      container: document.querySelector('.pagination'),
      items: document.querySelectorAll('.pagination__item'),
      paginationList: document.querySelector('.pagination__list'),
      pages: document.querySelectorAll('.js-page'),
      link: document.querySelectorAll('.pagitation__link'),
      prev: document.querySelector('.prev-js'),
      next: document.querySelector('.next-js'),
      first: document.querySelector('.first-js'),
      last: document.querySelector('.last-js'),
      prevMore: document.querySelector('.prevMore-js'),
      nextMore: document.querySelector('.nextMore-js'),
    },
    modalTeamRef: {
      // ref: document.querySelector('.selector')
    },
    libraryRef: {
      // ref: document.querySelector('.selector')
    },
    galleryRef: {
      // ref: document.querySelector('.selector')
    },
    filmDetailsRef: {
      // ref: document.querySelector('.selector')
    },
    footerRef: {
      // ref: document.querySelector('.selector')
    },
  };
}
