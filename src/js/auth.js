import { initializeApp } from 'firebase/app';
import { refs } from './refs/refs';
import { notify } from './notify';
import { switchPageToHome } from './change-page';
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
  onAuthStateChanged,
} from 'firebase/auth';
import langs from './language/language-map';

const { languageSelect } = refs().panel;

const firebaseConfig = {
  apiKey: 'AIzaSyArgaVgLGot3MCrNA7ImJovdOt4rbnN4Y4',
  authDomain: 'filmoteka-t.firebaseapp.com',
  projectId: 'filmoteka-t',
  storageBucket: 'filmoteka-t.appspot.com',
  messagingSenderId: '734879788032',
  appId: '1:734879788032:web:64f3d554a2e242158e7ce5',
  measurementId: 'G-4ENXLGXMB1',
};
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

const btnAuth = refs().headerRef.btnAuth;
const btnLibrary = refs().headerRef.btnLibrary;
const { detailBtns } = refs().filmDetailsRef;

export function checkLogSatus() {
  const textOut = langs.logOut[languageSelect.value];
  const textIn = langs.logIn[languageSelect.value];

  btnLibrary.style.display = 'none';
  detailBtns.style.display = 'none';
  btnAuth.textContent = textIn;

  onAuthStateChanged(auth, user => {
    if (user) {
      btnLibrary.style.display = 'block';
      detailBtns.style.display = 'flex';
      btnAuth.setAttribute('actions', 'logged');
      btnAuth.textContent = textOut;
    } else {
      btnAuth.setAttribute('actions', 'out');
    }
  });
  btnAuth.addEventListener('click', authHandler);
}

function authHandler(e) {
  const textIn = langs.logIn[languageSelect.value];
  const textHi = langs.hello[languageSelect.value];

  if (e.currentTarget.getAttribute('actions') === 'logged') {
    signOut(auth);
    btnAuth.setAttribute('actions', 'out');
    btnAuth.textContent = textIn;
    btnLibrary.style.display = 'none';
    detailBtns.style.display = 'none';
    switchPageToHome();
  } else {
    try {
      signInWithPopup(auth, provider).then(res =>
        notify(`${textHi}, ${res.user.displayName}`)
      );
    } catch (error) {
      console.log(error);
    }
  }
}
