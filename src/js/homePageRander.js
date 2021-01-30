import galleryTpl from "../templates/film-card-home.hbs"
import genres from "./genres";
import refs from "./refs"





const apiKey = '030295876ec9637cb436e167c8c73741';
const page = '1';
const baseUrl = 'https://api.themoviedb.org/3';


fetch(`${baseUrl}/trending/movie/day?&page=${page}&api_key=${apiKey}`)
  .then(response => response.json())
  .then(({ results}) => updateGalleryMarkup(results))
  .catch(error => console.log(error));




function updateGalleryMarkup(results) {
 results.map((item) => {
    let newGenres = [];
    item.genre_ids.map((id) => {
      const found = genres.find((item) => item.id === id);

      newGenres.push(found.name);
    });
    if (newGenres.length >= 3) {
      const normalizedGenres = newGenres.slice(0, 2);
      normalizedGenres.push("Other");
      item.genre_ids = normalizedGenres.join(', ')
      item.release_date = item.release_date.slice(0, 4);
    } else {
      item.genre_ids = newGenres.join(', ');
      if (item.release_date) item.release_date = item.release_date.slice(0, 4);
    }
    return item;
  });
    const galleryMarkup = galleryTpl(results);
    refs.galleryRef.insertAdjacentHTML("beforeend", galleryMarkup);
}
 

// export default HomePageRander;