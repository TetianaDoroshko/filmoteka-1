import { refs } from './refs/refs';
import { getDetails } from './api-service/get-details';

const { filmDetailsRef } = refs();

filmDetailsRef.filmDetailsModalOpen.addEventListener('click', onModelOpen);

function onModelOpen(event) {
  event.preventDefault();

  if (!event.target.classList.contains('class li')) {
    return;
  }
  filmDetailsRef.filmDetailsModal.classList.remove('is-hidden');
}
