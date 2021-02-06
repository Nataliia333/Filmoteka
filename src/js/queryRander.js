
import genres from './genres';
import refs from './refs';
import { hidePaginationHome } from './pagination';
import { updateGalleryMarkup } from './homePageRander';
import { startToSpin, stopToSpin } from './spin';


const apiKey = '030295876ec9637cb436e167c8c73741';
const page = '1';
const baseUrl = 'https://api.themoviedb.org/3';

function movieQueryFetch(inputValue, page) {
startToSpin();
  return fetch(`${baseUrl}/search/movie?api_key=${apiKey}&query=${inputValue}&page=${page}`)
        .then(response => response.json())
        .finally(stopToSpin());
    }

refs.formRef.addEventListener("submit", queryHandler);


function queryHandler(event) {
  event.preventDefault();
  const form = event.currentTarget;
  const inputValue = form.elements.query.value;
  refs.galleryRef.innerHTML = '';
  form.reset();
  startToSpin();
  movieQueryFetch(inputValue).then(({ results, total_results }) => {
    updateGalleryMarkup(results, genres);
    showErrorSentence(results);
  }).finally(stopToSpin())
}

function showErrorSentence(results) {
  if (results.length === 0) {
    refs.errorRef.classList.add('is-shown');
  } else {
    refs.errorRef.classList.remove('is-shown');
  }
  hidePaginationHome();
}

export { movieQueryFetch, queryHandler };
