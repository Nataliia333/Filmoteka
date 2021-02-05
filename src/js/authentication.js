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
function handleRegistrationBtn() {
  refs.overlay.classList.add('is-open');
}

refs.email.addEventListener('change', () => newApp.handleChange(refs.email));
refs.password.addEventListener('change', () =>
  newApp.handleChange(refs.password),
);

refs.createBtn.addEventListener('click', () => {
  newApp
    .createAccount()
    .then(res => foo())
    .catch(error => addCreateNotification());
});

refs.submitBtn.addEventListener('click', () => {
  newApp
    .signInAccount()
    .then(res => foo())
    .catch(error => addNotification());
});

function foo() {
  refs.myLibraryBtn.style = 'pointer-events: auto';
  refs.overlay.classList.remove('is-open');
}

function addCreateNotification() {
  refs.notification.textContent = 'Неверный пароль или адрес электронной почты';
}

function addNotification() {
  refs.notification.textContent = 'Неверный пароль или адрес электронной почты';
}
