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

const submitRef = document.querySelector('.sign-in-btn');
const createRef = document.querySelector('.create-btn');
const emailRef = document.getElementById('email');
const passwordRef = document.getElementById('password');
const notificationRef = document.querySelector('.notification');
const overlayRef = document.querySelector('.overlay');

emailRef.addEventListener('change', () => newApp.handleChange(emailRef));
passwordRef.addEventListener('change', () => newApp.handleChange(passwordRef));

createRef.addEventListener('click', () => {
  newApp
    .createAccount()
    .then(res => foo())
    .catch(error => addCreateNotification());
});

submitRef.addEventListener('click', () => {
  newApp
    .signInAccount()
    .then(res => foo())
    .catch(error => addNotification());
});

function foo() {
  refs.myLibraryBtn.style = 'pointer-events: auto';
  overlayRef.classList.remove('is-open');
}

function addCreateNotification() {
  notificationRef.textContent = 'Неверный пароль или адрес электронной почты';
}

function addNotification() {
  notificationRef.textContent = 'Неверный пароль или адрес электронной почты';
}
