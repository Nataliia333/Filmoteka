import galleryTpl from "../templates/film-card-home.hbs"
import genres from "./genres";
import refs from "./refs"
import {  hidePaginationHome} from "./pagination"
import { updateGalleryMarkup } from "./homePageRander"
import { genreTransform } from "./genres"


const apiKey = '030295876ec9637cb436e167c8c73741';
const page = '1';
const baseUrl = 'https://api.themoviedb.org/3';

function movieQueryFetch(inputValue) {
  return fetch(`${baseUrl}/search/movie?api_key=${apiKey}&query=${inputValue}&page=${page}`)
        .then(response => response.json())
    }

refs.formRef.addEventListener("submit", queryHandler);


function queryHandler(event) {
  event.preventDefault();
  const form = event.currentTarget;
  const inputValue = form.elements.query.value;
  refs.galleryRef.innerHTML = "";
  form.reset();
  movieQueryFetch(inputValue)
    .then(({ results }) => {
      updateGalleryMarkup(results, genres)
      showErrorSentence(results)
    })
}


function showErrorSentence(results) {
  if (results.length === 0) {
     refs.errorRef.classList.add('is-shown')        
  } else {
  refs.errorRef.classList.remove('is-shown')
  }
   hidePaginationHome()
}

