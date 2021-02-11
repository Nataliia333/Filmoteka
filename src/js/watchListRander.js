import refs from './refs'
import libraryTplW from '../templates/film-card-library-watched.hbs'
import { normalizeGenres } from "./genres"
import {getMovieById} from './apiSevice'


// refs.libBtnContainer.addEventListener('click', showWatchedMarkup)
refs.galleryRef.addEventListener('click', removeFromWatched)

function watchedClickHandler(event) {
    openWatchedPage()
    }


const updateWatchedMarkup = (results) => {
    normalizeGenres(results);
    const markup = libraryTplW({results})
    refs.galleryRef.insertAdjacentHTML('beforeend', markup)
  
    
}

function removeFromWatched (event) {
    if (event.target.className !== 'remove-from-watched') {
        return
    }
    const itemId = event.target.dataset.id
    const savedId = localStorage.getItem('watched')
    const parsedId = JSON.parse(savedId)
    const filteredId = parsedId.filter(el => el !== itemId);
    localStorage.setItem('watched', JSON.stringify(filteredId));
if (localStorage.getItem('watched') === '[]' || localStorage.getItem('watched') === null) {
    watchListEmpty();
        return
    }
    refs.galleryRef.innerHTML = ''
    filteredId.forEach(el => {
       getMovieById(el)
            .then(data => {
                updateWatchedMarkup(data)
            })
            .catch(error => console.log(error))
    });
}


function watchListEmpty() {
    refs.galleryRef.textContent = "Your watched list is empty!"
    refs.galleryRef.classList.add('empty-list')
}
 

function openWatchedPage() {
    if (localStorage.getItem('watched') === '[]' || localStorage.getItem('watched') === null) {
        watchListEmpty()
        return
    }
    refs.galleryRef.innerHTML = '';
    const savedId = localStorage.getItem('watched');
    const parsedId = JSON.parse(savedId);
    parsedId.forEach(el => {
       getMovieById(el)
            .then(data => updateWatchedMarkup(data))
    });
}



export { openWatchedPage, watchedClickHandler}


