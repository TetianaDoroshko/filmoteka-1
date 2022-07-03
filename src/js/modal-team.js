const teamModal = document.querySelector('.team-modal');
const teamModalBtn = document.querySelector('.tm-close-btn');
const teamModalOpen = document.querySelector('.footer-link');

teamModalOpen.addEventListener('click', openModal);

function openModal(e){
    e.preventDefault();
    teamModal.classList.remove('visually-hidden');

    window.addEventListener('keydown', closeModalByEsc);
    window.addEventListener('click', closeModalByClick);
    teamModalBtn.addEventListener('click', closeModal);
    
    function closeModalByEsc(e){
        if(e.key === 'Escape'){
            teamModal.classList.add('visually-hidden');
            window.removeEventListener('keydown', closeModalByEsc);
            window.removeEventListener('click', closeModalByClick);
            teamModalBtn.removeEventListener('click', closeModal);
        }
    }

    function closeModalByClick(e){
        if(e.target === teamModal){
            teamModal.classList.add('visually-hidden');
            window.removeEventListener('click', closeModalByClick);
            window.removeEventListener('keydown', closeModalByEsc);
            teamModalBtn.removeEventListener('click', closeModal);
        }
    }

    function closeModal(e){
        teamModal.classList.add('visually-hidden');
        window.removeEventListener('click', closeModalByClick);
        window.removeEventListener('keydown', closeModalByEsc);
        teamModalBtn.removeEventListener('click', closeModal);
    }
}