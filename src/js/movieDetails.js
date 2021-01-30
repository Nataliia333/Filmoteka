import modalTpl from "../templates/modal.hbs"
import genres from "./genres";
import refs from "./refs";

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
    }
}

function updateModalMarkup(data) {
    const modalMarkup = modalTpl(data);
     refs.modalContentRef.insertAdjacentHTML("beforeend", modalMarkup);

}



function onOpenModal() {
 refs.backdropRef.classList.add('is-open');
}