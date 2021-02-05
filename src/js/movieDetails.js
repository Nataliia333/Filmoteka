import modalTpl from "../templates/modal.hbs"
import refs from "./refs";
import addToQueue from "./localStorage";
import addToWatched from "./localStorage";
import { updateLibraryGalleryMarkup } from "./myLibrary";

const apiKey = '030295876ec9637cb436e167c8c73741';
const baseUrl = 'https://api.themoviedb.org/3';

function getMovieById(movieId){
    return fetch(`${baseUrl}/movie/${movieId}?api_key=${apiKey}`)
        .then(response => response.json())
        .then(data => updateModalMarkup(data))
        .catch(error => console.log(error));
}

refs.galleryRef.addEventListener("click", movieDetailsHandler);

function movieDetailsHandler(event) {
    if (event.target.nodeName !== "IMG") {
        return
    } else {
        const movieId = event.target.dataset.id;
        getMovieById(movieId);
        onOpenModal();
        addToQueue.queue(movieId);
        addToWatched.watched(movieId);
    
    }
}

function normalizeGenres(data) {
  const newGenres = data.genres.slice(0, 2).map(({ name }) => name);
  data.genres = newGenres.join(', ');
  return  data.genres;
}

function updateModalMarkup(data) {
  normalizeGenres(data);
  const modalMarkup = modalTpl(data);
  refs.modalContentRef.insertAdjacentHTML("beforeend", modalMarkup);

}



function onOpenModal() {
  refs.backdropRef.classList.add('is-open');
  window.addEventListener('keydown', onPressESC);
  refs.libModalBtn.addEventListener("click", myLibraryModalClickHandler);
  
}


function myLibraryModalClickHandler() {
  onCloseModal()
   updateLibraryGalleryMarkup()
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
