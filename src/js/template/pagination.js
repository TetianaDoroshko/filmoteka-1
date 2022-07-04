// возвращает разметку пагинации
import images from '../../images/sprite.svg';

export function paginationListMarkup(page) {
  let item = '';
  const isHidden = page > 9 ? '' : 'is-hidden';

  for (let i = 1; i <= page; i += 1) {
    if (window.matchMedia('(max-width: 767px)').matches) {
      if (page > 5 && i === 6) {
        break;
      }
    }
    if (page > 9 && i === 10) {
      break;
    }

    item += `<li class="pagination__item js-page" data-num='${i}'><a class="pagination__link" href="#">${i}</a></li>`;
  }

  return `
  <ul class="pagination__list pag-list-js">
      <li class="button prev-js pagination__item"><svg class="button__icon" width="16" height ="16">
          <use href="${images}#arrow-right"></use>
        </svg></li>
      <li class="pagination__item first-js is-hidden hidden"><a class="pagination__link" href="#">1</a></li>
      <li class="pagination__item prevMore-js is-hidden hidden"><a class="pagination__link" href="#">...</a></li>
      ${item}
      <li class="pagination__item ${isHidden} nextMore-js hidden"><a class="pagination__link" href="#">...</a></li>
      <li class="pagination__item ${isHidden} last-js hidden"><a class="pagination__link" href="#">${page}</a></li>
      <li class="button next-js pagination__item"><svg class="button__icon" width="16" height="16">
          <use href="${images}#arrow-left"></use>
        </svg></li>

    </ul>`;
}
