import modalTpl from '../templates/modal.hbs';
import refs from './refs';
import {saveFilmToLocalstorage} from './localStorage';
import {normalizeGenres} from "./genres"
import { startToSpin, stopToSpin } from './spin';


const apiKey = '030295876ec9637cb436e167c8c73741';
const baseUrl = 'https://api.themoviedb.org/3';

function getMovieById(movieId) {
  return fetch(`${baseUrl}/movie/${movieId}?api_key=${apiKey}`)
    .then(response => response.json())
  
}

refs.galleryRef.addEventListener('click', movieDetailsHandler);

function movieDetailsHandler(event) {
  if (event.target.nodeName !== 'IMG') {
    return;
  }
 const movieId = event.target.dataset.id;
  localStorage.setItem('movieId', movieId);
  modalLoad(movieId) 
  onOpenModal();
  saveFilmToLocalstorage();
  }

// function checkFilmList(movieId, key) {
//   const savedFilms = JSON.parse(localStorage.getItem(key));
//   const findFilm = savedFilms.find(el => el === movieId)
//   if (findFilm) {
//     modalLoad(movieId);
// }else 
// }

function modalLoad(movieId) {
  startToSpin()
  getMovieById(movieId).then(data => updateModalMarkup(data))
    .catch(error => console.log(error)).finally(stopToSpin())
}


// function modalLoad(movieId) {
//   getMovieById(movieId).then(data => updateModalMarkup(data))
//     .catch(error => console.log(error));
// }


function updateModalMarkup(data) {
  normalizeGenres(data);
  const modalMarkup = modalTpl(data);
  refs.modalContentRef.insertAdjacentHTML('beforeend', modalMarkup);
}

// function updateModalLibraryMarkup(data) {
//   normalizeGenres(data);
//   const modalMarkup = modalTpl(data);
//   refs.modalContentRef.insertAdjacentHTML('beforeend', modalMarkup);
// }

function onOpenModal() {
  refs.backdropRef.classList.add('is-open');
  window.addEventListener('keydown', onPressESC);
  // refs.homeLinkModal.addEventListener('click');
}


refs.backdropRef.addEventListener('click', onBackdropClick);

function onCloseModal() {
  window.removeEventListener('keydown', onPressESC);
  refs.backdropRef.classList.remove('is-open');
  cleanModalContent();
}

function onBackdropClick(event) {
  if (event.target === refs.backdropRef) onCloseModal();
}

function onPressESC(event) {
  if (event.code === 'Escape') onCloseModal();
}

function cleanModalContent() {
  refs.modalContentRef.innerHTML = '';
}

export {getMovieById} 