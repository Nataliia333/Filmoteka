import App from './App';
import firebase from 'firebase';
import refs from './refs';

const firebaseConfig = {
  apiKey: 'AIzaSyBSBjwfe1PBEOub-TsHsL6NYaxVd982bac',
  authDomain: 'test-project-filmoteka.firebaseapp.com',
  databaseURL: 'https://test-project-filmoteka-default-rtdb.firebaseio.com',
  projectId: 'test-project-filmoteka',
  storageBucket: 'test-project-filmoteka.appspot.com',
  messagingSenderId: '823123051299',
  appId: '1:823123051299:web:8d5804611487fb919a8296',
};

firebase.initializeApp(firebaseConfig);

const newApp = new App();

refs.registrationBtn.addEventListener('click', handleRegistrationBtn);

refs.email.addEventListener('change', () => newApp.handleChange(refs.email));
refs.password.addEventListener('change', () =>
  newApp.handleChange(refs.password),
);

function handleRegistrationBtn() {
  refs.overlay.addEventListener('click', onOverlayClick);
  refs.overlay.classList.add('is-open');
  window.addEventListener('keydown', onPressESC);

  refs.createBtn.addEventListener('click', () => {
    newApp
      .createAccount()
      .then(res => handleResponce())
      .catch(error => addCreateNotification());
  });

  refs.submitBtn.addEventListener('click', () => {
    newApp
      .signInAccount()
      .then(res => {
        handleResponce();
      })
      .catch(error => addNotification());
  });
}

function handleResponce() {
  refs.myLibraryBtn.style = 'pointer-events: auto';
  refs.homeLink.style = 'pointer-events: auto';
  refs.overlay.classList.remove('is-open');
  refs.registrationBtn.style = 'visibility: hidden;';
  newApp.state.hasAccount = true;
  // console.log(newApp.state.hasAccount);
  // newApp.hasAccount = true;
}

function addCreateNotification() {
  refs.notification.textContent =
    'Неверный пароль или адрес электронной почты, или пользователь уже существует';
}

function addNotification() {
  refs.notification.textContent = 'Неверный пароль или адрес электронной почты';
}

function onCloseModal() {
  window.removeEventListener('keydown', onPressESC);
  refs.overlay.classList.remove('is-open');
}

function onOverlayClick(event) {
  if (event.target === refs.overlay) onCloseModal();
}

function onPressESC(event) {
  if (event.code === 'Escape') onCloseModal();
}

export default newApp;
