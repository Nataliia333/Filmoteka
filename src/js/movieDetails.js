import modalTpl from '../templates/modal.hbs';
import refs from './refs';
import { normalizeGenres } from './genres';
// import newApp from './authentication';
import {saveFilmToLocalstorage} from './localStorage';
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


function modalLoad(movieId) {
  startToSpin()
  getMovieById(movieId).then(data => updateModalMarkup(data))
    .catch(error => console.log(error)).finally(stopToSpin())
}


function updateModalMarkup(data) {
console.log(data)
  normalizeGenres(data);
  const modalMarkup = modalTpl(data);
  refs.modalContentRef.insertAdjacentHTML('beforeend', modalMarkup);
}

// function updateModalLibraryMarkup(data) {
//   normalizeGenres(data);
//   const modalMarkup = modalLibraryTpl(data);
//   refs.modalContentRef.insertAdjacentHTML('beforeend', modalMarkup);
// }

// function checkList(movieId) {
//   const watched = JSON.parse(localStorage.getItem('watched'));
//   const queue = JSON.parse(localStorage.getItem('queue'));
//   const arr = [...watched, ...queue];
//   const findFilm = arr.find(el => el === movieId)
//   if (findFilm) {
//     onOpenModal();
//     startToSpin()
//     getMovieById(findFilm).then(data => updateModalLibraryMarkup(data))
//       .catch(error => console.log(error)).finally(stopToSpin())
//   }else modalLoad(movieId)
// }

function onOpenModal() {
  refs.backdropRef.classList.add('is-open');
  window.addEventListener('keydown', onPressESC);

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

export { getMovieById, onOpenModal, cleanModalContent};



