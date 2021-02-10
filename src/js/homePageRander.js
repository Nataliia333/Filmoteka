import galleryTpl from '../templates/film-card-home.hbs';
import genres from './genres';
import refs from './refs';
import { genreTransform } from './genres';
import { startPaginate, showPaginationHome } from './pagination';
import { startToSpin, stopToSpin } from './spin';
import { queryHandler } from './queryRander';
import { fetchTrands } from "./apiSevice"


const page = '1';


function updateGalleryMarkup(results, genres) {
  genreTransform(results, genres);

  const galleryMarkup = galleryTpl(results);
  refs.galleryRef.insertAdjacentHTML('beforeend', galleryMarkup);

}

function homePageLoad(page) {
  startToSpin();
  fetchTrands(page)
    .then(({ results, total_results }) => {
      updateGalleryMarkup(results, genres);

      startPaginate(total_results);
    })
    .finally(stopToSpin);


}

homePageLoad(page);

refs.homeLink.addEventListener('click', updateHomeMarkup);

function updateHomeMarkup() {
  updateHomeHeaderMarkup();
  updateHomeMainMarkup();
  const searchForm = document.querySelector('.search-form');
  searchForm.addEventListener('submit', queryHandler);
}

function updateHomeHeaderMarkup() {
  const markup = `
      <div class="wrapper-input">
        <form class="search-form" id="search-form" autocomplete="off">
          <label class="input-label">
            <input class="inputtext" name="query" placeholder=" " type="text" required>
            <span class="text-search-films">Поиск фильма</span>
            <span class="search-icon"></span>
          </label>
        </form>
      </div>
      <p class="error-sentence">Search result is not successful. Enter the correct movie name.</p>
      `;
  refs.libBtnContainer.innerHTML = '';
  refs.libBtnContainer.insertAdjacentHTML('beforeend', markup);
  refs.headerRef.classList.remove('header-library');
  headerOrangeLineHome();
}

function updateHomeMainMarkup() {
  refs.galleryRef.innerHTML = '';
  homePageLoad(page);
  showPaginationHome();
}

function headerOrangeLineHome() {
  refs.homeLink.classList.add("header-orange-style");
  refs.myLibraryBtn.classList.remove("header-orange-style");
}



export { updateGalleryMarkup, homePageLoad, fetchTrands, updateHomeMarkup };

export default homePageLoad;
