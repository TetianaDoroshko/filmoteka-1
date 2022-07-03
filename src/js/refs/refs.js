export function refs() {
  return {
    headerRef: {
      // ref: document.querySelector('.selector')
    },
    homeRef: {
      // ref: document.querySelector('.selector')
    },
    libraryRef: {
      // ref: document.querySelector('.selector')
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
      teamModal: document.querySelector('.team-modal'),
      teamModalBtn: document.querySelector('.tm-close-btn'),
      teamModalOpen: document.querySelector('.footer-link'),
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
