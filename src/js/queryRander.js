import genres from './genres';
import refs from './refs';
import { hidePaginationHome } from './pagination';
import { updateGalleryMarkup } from './homePageRander';
import { startToSpin, stopToSpin } from './spin';
import {movieQueryFetch} from './apiSevice'


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
  })
  .finally(stopToSpin)
}

function showErrorSentence(results) {
  if (results.length === 0) {
    refs.errorRef.classList.add('is-shown');
  } else {
    refs.errorRef.classList.remove('is-shown');
  }
  hidePaginationHome();
}

export { queryHandler };
