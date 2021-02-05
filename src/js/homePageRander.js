import galleryTpl from "../templates/film-card-home.hbs"
import genres from "./genres";
import refs from "./refs"
import { genreTransform } from "./genres"
import { startPaginate } from "./pagination";
import {startToSpin, stopToSpin} from "./spin"



const apiKey = '030295876ec9637cb436e167c8c73741';
const page = '1';
const baseUrl = 'https://api.themoviedb.org/3';


function fetchTrands(page) {
  return fetch(`${baseUrl}/trending/movie/day?&page=${page}&api_key=${apiKey}`)
    .then(response => response.json())
    }


function updateGalleryMarkup(results, genres) {
  genreTransform(results, genres);
    const galleryMarkup = galleryTpl(results);
  refs.galleryRef.insertAdjacentHTML("beforeend", galleryMarkup);
}
 

function homePageLoad(page) {
  // startToSpin();
  fetchTrands(page)
    .then(({ results, total_results }) => {
    updateGalleryMarkup(results, genres);
      startPaginate(total_results)
    })
  // .finally(stopToSpin());
}
    
       
 
   

homePageLoad(page);

export { updateGalleryMarkup, homePageLoad, fetchTrands };
export default homePageLoad;