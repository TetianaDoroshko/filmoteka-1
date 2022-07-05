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
      container: document.querySelector('.pag-container-js'),
      paginationList: document.querySelector('.pag-list-js'),
      pages: document.querySelectorAll('.js-page'),
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
    loaderRef: {
      loader: document.querySelector('.loader'),
    },
  };
}
