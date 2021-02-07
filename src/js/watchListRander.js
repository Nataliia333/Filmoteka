import refs from './refs'
import libraryTplW from '../templates/film-card-library-watched.hbs'
import { normalizeGenres} from "./genres"




const apiKey = '030295876ec9637cb436e167c8c73741';
const baseUrl = 'https://api.themoviedb.org/3';

refs.libBtnContainer.addEventListener('click', showWatchedMarkup)
// refs.galleryRef.addEventListener('click', removeFromWatched)

console.log(refs.libBtnContainer)


function showWatchedMarkup(event) {
    console.log(event) 
   if (event.target.textContent !== 'WATCHED') {
        return
    }
    openWatchedPage()
    }


const updateWatchedMarkup = (results) => {
    normalizeGenres(results);
    const markup = libraryTplW({results})
    refs.galleryRef.insertAdjacentHTML('beforeend', markup)
  
    
}

// const removeFromWatched = (e) => {
//     if (e.target.id !== 'remove') {
//         return
//     }
//      console.log(e)
//     const itemId = e.target.dataset.id
//     console.log(itemId)
//     const savedId = localStorage.getItem('watched')
//     const parsedId = JSON.parse(savedId)
//     const filteredId = parsedId.filter(el => el !== itemId)

//     localStorage.setItem('watched', JSON.stringify(filteredId))


//     if (localStorage.getItem('watched') === '[]' || localStorage.getItem('watched') === null) {
//         watchListEmpty()
//         return
//     }
//     refs.galleryRef.innerHTML = ''

//     filteredId.forEach(el => {
//         fetch(`${baseUrl}/movie/${el}?api_key=${apiKey}`)
//             .then(response => response.json())
//             .then(data => {
//                 updateWatchedMarkup(data)
//             })
//             .catch(error => console.log(error))
//     }
//     );
// }

// const watchedRemoveBtn = document.querySelector("#removeButton");
// console.log(watchedRemoveBtn )

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
        fetch(`${baseUrl}/movie/${el}?api_key=${apiKey}`)
            .then(response => response.json())
            .then(data => updateWatchedMarkup(data))
        // .catch(error => console.log(error));
    });
}

// function loadWatchedModal() {
    
// }

export { openWatchedPage }


