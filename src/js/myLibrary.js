import libraryGalleryTpl from "../templates/film-card-library.hbs"
import genres from "./genres";
import refs from "./refs"
import { genreTransform } from "./genres"
import { hidePaginationHome, showPaginationLibrary, startPaginate } from "./pagination";
import { fetchTrands } from "./homePageRander";

const apiKey = '030295876ec9637cb436e167c8c73741';
const page = '1';
const baseUrl = 'https://api.themoviedb.org/3';


refs.myLibraryBtn.addEventListener("click", myLibraryClickHandler);
refs.myLibraryBtnModal.addEventListener("click", myLibraryClickHandler, hideModal);

function myLibraryClickHandler(event) {
    showPaginationLibrary()
    hidePaginationHome()
    console.log(event)
    updateLibraryHeaderMarkup()
    refs.galleryRef.innerHTML = "";
    fetchTrands(page).then(({ results, total_results }) => {
    updateLibraryGalleryMarkup(results, genres);
    startPaginate(total_results)   
  });
}

function updateLibraryHeaderMarkup() {
    const markup = `
      <ul class="header-library-buttons">
          <li><button class="button-header-library">Watched</button></li> 
          <li><button class="button-header-library">Queue</button></li>
      </ul>`;
    refs.libBtnContainer.innerHTML = "";
    refs.libBtnContainer.insertAdjacentHTML('beforeend', markup);
    refs.headerRef.classList.add("header-library");
    refs.headerBtn.classList.remove("header-orange-style");
    refs.myLibraryBtn.classList.add("header-orange-style");
    hideModal()
}

function updateLibraryGalleryMarkup(results, genres) {
  genreTransform(results, genres);
    const libraryGalleryMarkup = libraryGalleryTpl(results);
  refs.galleryRef.insertAdjacentHTML("beforeend", libraryGalleryMarkup);
  window.scrollTo({
            top: document.documentElement.offsetHeight,
            behavior: "smooth",
 });
}

function hideModal() {
  refs.backdropRef.classList.remove('is-open');
}

export { updateLibraryGalleryMarkup };