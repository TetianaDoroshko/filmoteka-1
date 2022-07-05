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
      image: document.querySelector('.js-image'),
      title: document.querySelector('.js-title'),
      voteAverage: document.querySelector('.js-vote'),
      voteCount: document.querySelector('.js-vote-count'),
      popularity: document.querySelector('.js-popularity'),
      originTitle: document.querySelector('.js-title-orig'),
      genres: document.querySelector('.js-genres'),
      about: document.querySelector('.js-about'),
    },
    footerRef: {
      // ref: document.querySelector('.selector')
    },
  };
}
