import refs from './refs'
import libraryTpl from '../templates/film-card-library.hbs'
import { normalizeGenres, cutRelease } from "./movieDetails"




const apiKey = '030295876ec9637cb436e167c8c73741';
const baseUrl = 'https://api.themoviedb.org/3';



const showWatchedMarkup = (e) => {
     if (e.target.textContent !== 'Watched') {
        return
    }
   openWatchedPage()
}

const updateWatchedMarkup = (results) => {
    cutRelease(results)
    normalizeGenres(results);
    const markup = libraryTpl({results})
    refs.galleryRef.insertAdjacentHTML('beforeend', markup)
  
    
}

const removeFromWatched = (e) => {
    if (e.target.id !== 'removeButtonWatched') {
        return
    }
    const itemId = e.target.dataset.refId
    const savedId = localStorage.getItem('watched')
    const parsedId = JSON.parse(savedId)
    const filteredId = parsedId.filter(el => el !== itemId)

    localStorage.setItem('watched', JSON.stringify(filteredId))


    if (localStorage.getItem('watched') === '[]' || localStorage.getItem('watched') === null) {
        watchListEmpty()
        return
    }
    refs.galleryRef.innerHTML = ''

    filteredId.forEach(el => {
        fetch(`${baseUrl}/movie/${el}?api_key=${apiKey}`)
            .then(response => response.json())
            .then(data => {
                updateWatchedMarkup(data)
            })
            .catch(error => console.log(error))
    }
    );
}
refs.libBtnContainer.addEventListener('click', showWatchedMarkup)

refs.galleryRef.addEventListener('click', removeFromWatched)
console.log(refs.galleryRef)
// const watchedRemoveBtn = document.querySelector("#removeButton");
// console.log(watchedRemoveBtn )
function watchListEmpty() {
    refs.galleryRef.textContent = "Your watched list is empty!"
    refs.galleryRef.classList.add('empty-list')
}
 

function openWatchedPage() {
    // refs.watchedButton.style.backgroundColor = "#ff6b08";
    if (localStorage.getItem('watched') === '[]' || localStorage.getItem('watched') === null) {
        watchListEmpty()
        return
    }
    refs.galleryRef.innerHTML = '';
    const savedId = localStorage.getItem('watched');
    const parsedId = JSON.parse(savedId);
    parsedId.forEach(el => {
        fetch(`${baseUrl}/movie/${el}?api_key=${apiKey}`)
            .then(response => response.json())
            .then(data => updateWatchedMarkup(data))
        // .catch(error => console.log(error));
    });
}


export { openWatchedPage }