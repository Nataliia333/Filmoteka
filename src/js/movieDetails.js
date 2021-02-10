import modalTpl from '../templates/modal.hbs';
import refs from './refs';
import { normalizeGenres } from './genres';
// import newApp from './authentication';
import {saveFilmToLocalstorage} from './localStorage';
import { startToSpin, stopToSpin } from './spin';
import {getMovieById} from './apiSevice'


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
  startToSpin();
  getMovieById(movieId).then(data => updateModalMarkup(data))
    .catch(error => console.log(error))
    .finally(stopToSpin)
}


function updateModalMarkup(data) {
  normalizeGenres(data);
  const modalMarkup = modalTpl(data);
  refs.modalContentRef.insertAdjacentHTML('beforeend', modalMarkup);
}



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



