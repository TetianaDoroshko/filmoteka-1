import { refs } from './refs/refs';

let modalTeamRef;
modalTeamRef = refs().modalTeamRef;

modalTeamRef.teamModalOpen.addEventListener('click', openModal);

function openModal(e) {
  e.preventDefault();
  modalTeamRef.teamModal.classList.remove('is-hidden');

  window.addEventListener('keydown', closeModalByEsc);
  window.addEventListener('click', closeModalByClick);
  modalTeamRef.teamModalBtn.addEventListener('click', closeModal);

function clearEventListeners() {
  window.removeEventListener('click', closeModalByClick);
  window.removeEventListener('keydown', closeModalByEsc);
  modalTeamRef.teamModalBtn.removeEventListener('click', closeModal);
}

function closeModalByEsc(e) {
  if (e.key === 'Escape') {
    modalTeamRef.teamModal.classList.add('is-hidden');
    clearEventListeners();
  }
}

function closeModalByClick(e) {
  if (e.target === modalTeamRef.teamModal) {
    modalTeamRef.teamModal.classList.add('is-hidden');
    clearEventListeners();
  }
}

function closeModal(e) {
  modalTeamRef.teamModal.classList.add('is-hidden');
  clearEventListeners();
}
}