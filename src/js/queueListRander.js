import refs from './refs'
import libraryTplQ from '../templates/film-card-library-queue.hbs'
import { normalizeGenres} from "./genres"
import {getMovieById} from './apiSevice'


// refs.libBtnContainer.addEventListener('click', showQueueMarkup)
refs.galleryRef.addEventListener('click', removeFromQueue)

function queueClickHandler (event) {
    openQueuePage()
}


const updateQueueMarkup = (results) => {
    normalizeGenres(results);
    const markup = libraryTplQ({results})
    refs.galleryRef.insertAdjacentHTML('beforeend', markup)
  
}



function removeFromQueue (event) {
    if (event.target.className !== 'remove-from-queue') {
        return
    }
    const itemId = event.target.dataset.id;
    const savedId = localStorage.getItem('queue')
    const parsedId = JSON.parse(savedId)
    const filteredId = parsedId.filter(el => el !== itemId)

    localStorage.setItem('queue', JSON.stringify(filteredId))


    if (localStorage.getItem('queue') === '[]' || localStorage.getItem('queue') === null) {
        queueListEmpty();
        return
    }
    
    refs.galleryRef.innerHTML = ''

    filteredId.forEach(el => {
       getMovieById(el)
            .then(data => {
                updateQueueMarkup(data)
            })
            .catch(error => console.log(error))
    }
    );
}

 
 function queueListEmpty() {
    refs.galleryRef.textContent = "Your queue list is empty!"
    refs.galleryRef.classList.add('empty-list')
}
 


function openQueuePage() {
     if (localStorage.getItem('queue') === '[]' || localStorage.getItem('queue') === null) {
        queueListEmpty();
        return
    }
    refs.galleryRef.innerHTML = ''
    const savedId = localStorage.getItem('queue');
    const parsedId = JSON.parse(savedId)
    parsedId.forEach(el => {
       getMovieById(el)
            .then(data => updateQueueMarkup(data))
            .catch(error => console.log(error))
    })
}

export {openQueuePage, queueClickHandler}