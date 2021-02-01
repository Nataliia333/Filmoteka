import modalTpl from "../templates/modal.hbs"
import genres from "./genres";
import refs from "./refs";
import addToQueue from "./localStorage";
import addToWatched from "./localStorage";
import updateLibraryMarkup from "./myLibrary"



// const movieId = "532865";
const apiKey = '030295876ec9637cb436e167c8c73741';
const baseUrl = 'https://api.themoviedb.org/3';

function getMovieById(movieId){
    fetch(`${baseUrl}/movie/${movieId}?api_key=${apiKey}`)
        .then(response => response.json())
        .then(data => updateModalMarkup(data))
        .catch(error => console.log(error));
}

refs.galleryRef.addEventListener("click", movieDetailsHandler);

function movieDetailsHandler(event) {
    console.log(event.target.nodeName)
    if (event.target.nodeName !== "IMG") {
        return
    } else {
        const movieId = event.target.dataset.id;
        console.log(movieId)
        getMovieById(movieId);
        onOpenModal();
        addToQueue.queue(movieId);
        addToWatched.watched(movieId);
    
    }
}

function updateModalMarkup(data) {
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
   updateLibraryMarkup()
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
