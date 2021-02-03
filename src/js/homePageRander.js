import galleryTpl from "../templates/film-card-home.hbs"
import genres from "./genres";
import refs from "./refs"
import { genreTransform } from "./genres"


const apiKey = '030295876ec9637cb436e167c8c73741';
const page = '1';
const baseUrl = 'https://api.themoviedb.org/3';


fetch(`${baseUrl}/trending/movie/day?&page=${page}&api_key=${apiKey}`)
  .then(response => response.json())
  .then(({ results}) => updateGalleryMarkup(results))
  .catch(error => console.log(error));




function updateGalleryMarkup(results) {
   genreTransform(results, genres);
    const galleryMarkup = galleryTpl(results);
    refs.galleryRef.insertAdjacentHTML("beforeend", galleryMarkup);
}
 

// export default HomePageRander;