import refs from './refs'
import watchedList from '../templates/watched-list.hbs'
import galleryTpl from "../templates/film-card-home.hbs"


const apiKey = '030295876ec9637cb436e167c8c73741';
const baseUrl = 'https://api.themoviedb.org/3';



const showWatchedMarkup = (e) => {
    if (e.target.textContent !== 'Watched') {
        return
    }
    else if (localStorage.getItem('watched') === '[]' || localStorage.getItem('watched') === null) {
        refs.galleryRef.textContent = "Your watched list is empty!"
        return
    }
    refs.galleryRef.innerHTML = ''
    const savedId = localStorage.getItem('watched')
    const parsedId = JSON.parse(savedId)
    parsedId.forEach(el => {
        fetch(`${baseUrl}/movie/${el}?api_key=${apiKey}`)
            .then(response => response.json())
            .then(data => updateWatchedMarkup(data))
            .catch(error => console.log(error));
    });
    
}

const updateWatchedMarkup = (results) => {
    const markup = watchedList({results})
    refs.galleryRef.insertAdjacentHTML('beforeend', markup)
}

const removeFromWatched = (e) => {
    if (e.target.id !== 'removeButton') {
        return
    }
    const itemId = e.target.dataset.refId
    const savedId = localStorage.getItem('watched')
    const parsedId = JSON.parse(savedId)
    const filteredId = parsedId.filter(el => el !== itemId)

    localStorage.setItem('watched', JSON.stringify(filteredId))


    if (localStorage.getItem('watched') === '[]' || localStorage.getItem('watched') === null) {
        
        refs.galleryRef.textContent = "Your watched list is empty!"
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

