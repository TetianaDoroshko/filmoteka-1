export function refs() {
  return {
    headerRef: {
      header: document.querySelector('.header'),
      navLogo: document.querySelector('.navigation__logo'),
      searchForm: document.querySelector('.js-search-form'),
      headLibBackGr: document.querySelector('.header--library'),
      searchInput: document.querySelector('.js-form-input'),
    },
    searchRef: {
      searchForm: document.querySelector('.search-form'),
    },
    libraryButtonsRef: {
      btnContainer: document.querySelector('.js-btn-container'),
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
      libBtn: document.querySelector('.js-library'),
      homeBtn: document.querySelector('.js-home'),
    },
    galleryRef: {
      // ref: document.querySelector('.selector')
      moviesDiv: document.querySelector('#movies-gallery'),
    },
    filmDetailsRef: {
      filmDetailsModalContainer: document.querySelector('#movies-gallery'),
      filmDetailsModalClose: document.querySelector(
        '[data-action="close-modal"]'
      ),
      modalBackdrop: document.querySelector('.modal'),
      filmDetailsModal: document.querySelector('.modal'),
      image: document.querySelector('.js-image'),
      title: document.querySelector('.js-title'),
      voteAverage: document.querySelector('.js-vote'),
      voteCount: document.querySelector('.js-vote-count'),
      popularity: document.querySelector('.js-popularity'),
      originTitle: document.querySelector('.js-title-orig'),
      genres: document.querySelector('.js-genres'),
      about: document.querySelector('.js-about'),
      btnWatched: document.querySelector('.js-btn-modal-watched'),
      btnQueue: document.querySelector('.js-btn-modal-queue'),
    },
    footerRef: {
      // ref: document.querySelector('.selector')
    },
    loaderRef: {
      loader: document.querySelector('.js-loader'),
    },
    modalErrorRef: {
      modalError: document.querySelector('.windov-modal'),
      modalErrorText: document.querySelector('.error-modal__text'),
    },
    panel: {
      switcherBtn: document.querySelector('.switcher-toggle'),
      languageSelect: document.querySelector('.js-language-btn'),
    },
    upArrowRef: {
      upArrow: document.querySelector('.to-top-button'),
    },

    modalTrailerRef: {
      modalTrailer: document.querySelector('.js-trailer'),
    },
    
    trendingBtnsRef: {
      btnDay: document.querySelector('#day'),
      btnWeek: document.querySelector('#week'),
      trendingButtons: document.querySelector('.trending'),
    },
  };
}
