import refs from './refs'
import queueList from '../templates/queue-list.hbs'
import galleryTpl from "../templates/film-card-home.hbs"


const apiKey = '030295876ec9637cb436e167c8c73741';
const baseUrl = 'https://api.themoviedb.org/3';



const showQueueMarkup = (e) => {
    if (e.target.textContent !== 'Queue') {
        return
    }
    else if (localStorage.getItem('queue') === '[]' || localStorage.getItem('queue') === null) {
        queueListEmpty();
        return
    }
    refs.galleryRef.innerHTML = ''
    const savedId = localStorage.getItem('queue')
    const parsedId = JSON.parse(savedId)
    parsedId.forEach(el => {
        fetch(`${baseUrl}/movie/${el}?api_key=${apiKey}`)
            .then(response => response.json())
            .then(data => updateQueueMarkup(data))
            .catch(error => console.log(error));
    });
    
}

const updateQueueMarkup = (results) => {
    const markup = queueList({results})
    refs.galleryRef.insertAdjacentHTML('beforeend', markup)
}

const removeFromQueue = (e) => {
    if (e.target.id !== 'removeButton') {
        return
    }
    const itemId = e.target.dataset.refId
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