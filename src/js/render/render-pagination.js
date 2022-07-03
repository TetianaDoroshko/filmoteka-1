import { refs } from '../refs/refs';
import { paginationListMarkup } from '../template/pagination';

const { paginationRef } = refs();

export function renderPagination(totalPages) {
  const markup = paginationListMarkup(totalPages);

  paginationRef.container.innerHTML = markup;
}
