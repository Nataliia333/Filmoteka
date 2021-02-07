import refs from './refs'
import libraryTplQ from '../templates/film-card-library-queue.hbs'
import { normalizeGenres} from "./genres"
import { getMovieById } from "./movieDetails"


const apiKey = '030295876ec9637cb436e167c8c73741';
const baseUrl = 'https://api.themoviedb.org/3';



function showQueueMarkup (event) {
if (event.target.textContent !== 'QUEUE') {
        return
    }
    openQueuePage()
    removeFromQueue()
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
    const itemId = event.target.dataset.id
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
        fetch(`${baseUrl}/movie/${el}?api_key=${apiKey}`)
            .then(response => response.json())
            .then(data => {
                updateQueueMarkup(data)
            })
            .catch(error => console.log(error))
    }
    );
}

refs.libBtnContainer.addEventListener('click', showQueueMarkup)
refs.galleryRef.addEventListener('click', removeFromQueue)
 
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
        fetch(`${baseUrl}/movie/${el}?api_key=${apiKey}`)
            .then(response => response.json())
            .then(data => updateQueueMarkup(data))
            .catch(error => console.log(error))
    })
}
