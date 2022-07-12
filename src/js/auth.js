import { initializeApp } from 'firebase/app';
import { refs } from './refs/refs';
import {notify} from './notify';
import {switchPageToHome} from './change-page';

const btnAuth = refs().headerRef.btnAuth;
const btnLibrary = refs().headerRef.btnLibrary;

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

import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  getRedirectResult,
  signOut,
  onAuthStateChanged,
  signOut,
} from 'firebase/auth';

const auth = getAuth(app);

const provider = new GoogleAuthProvider();

document.addEventListener('DOMContentLoaded', checkLogSatus);

function checkLogSatus() {
    onAuthStateChanged(auth, user => {
    if(user) {
      btnLibrary.style.display = 'block';
      btnAuth.setAttribute('actions', 'logged');
      btnAuth.textContent = 'Log out';

    } else {
      btnAuth.setAttribute('actions', 'out');
    }

  })
    btnAuth.addEventListener('click', authHandler);
}


function authHandler (e) {
  if(e.currentTarget.getAttribute('actions') === 'logged') {
    signOut(auth);
    btnAuth.setAttribute('actions', 'out');
    btnAuth.textContent = 'Log in';
    btnLibrary.style.display = 'none';
    switchPageToHome()
  } else {
    try {
      signInWithPopup(auth, provider).then(res => notify(`Hello, ${res.user.displayName}`));
    } catch(error) {
      console.log(error);
    }
  }
}



export async function monitorAuthState() {
  try {
    return onAuthStateChanged(auth, user => {
      if (user) {
        console.log('юзер найден', user);
        return user;
      } else {
        console.log('user do not found');
        refs().galleryRef.moviesDiv.innerHTML =
          '<p>Needs authorization to see the content</p>';

        await signInWithPopup(auth, provider);
      }
    });
  } catch (error) {
    console.log(error);
  }
}
// signOut(auth);

export async function authorizate() {
    try {
        const result = await signInWithPopup(auth, provider);
        console.log('result', result);

    const user = await result.user;
    console.log('user', user);
    return user
    } catch {
        notify('Needs authorization for moving to Library')
    }
    
}


// signInWithPopup(auth, provider)
//   .then(result => {
//     console.log(result);
//     // This gives you a Google Access Token. You can use it to access the Google API.
//     const credential = GoogleAuthProvider.credentialFromResult(result);
//     console.log('credential', credential);
//     const token = credential.accessToken;
//     // The signed-in user info.
//     const user = result.user;
//     console.log('user', user);
//     // ...
//   })
//   .catch(error => {
//     // Handle Errors here.
//     const errorCode = error.code;
//     const errorMessage = error.message;
//     // The email of the user's account used.
//     // const email = error.customData.email;
//     // The AuthCredential type that was used.
//     const credential = GoogleAuthProvider.credentialFromError(error);
//     // ...
// //   });









// getRedirectResult(auth);
//   .then(result => {
//     // This gives you a Google Access Token. You can use it to access Google APIs.
//     const credential = GoogleAuthProvider.credentialFromResult(result);
//     const token = credential.accessToken;

//     // The signed-in user info.
//     const user = result.user;
//   })
//   .catch(error => {
//     // Handle Errors here.
//     const errorCode = error.code;
//     const errorMessage = error.message;
//     // The email of the user's account used.
//     // const email = error.customData.email;
//     // The AuthCredential type that was used.
//     const credential = GoogleAuthProvider.credentialFromError(error);
//     // ...
//   });
