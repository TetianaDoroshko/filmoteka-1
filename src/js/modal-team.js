const teamModal = document.querySelector('.team-modal');
const teamModalBtn = document.querySelector('.tm-close-btn');
const teamModalOpen = document.querySelector('.footer-link');

teamModalOpen.addEventListener('click', () => {
    event.preventDefault();
    teamModal.classList.remove('visually-hidden');
});

teamModalBtn.addEventListener('click', () => {
    event.preventDefault();
    teamModal.classList.add('visually-hidden');
});