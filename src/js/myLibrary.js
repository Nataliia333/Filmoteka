import refs from "./refs"
import { hidePaginationHome } from "./pagination";
import {openWatchedPage} from "./watchListRander"


refs.myLibraryBtn.addEventListener("click", myLibraryClickHandler);

function myLibraryClickHandler(event) {
    hidePaginationHome();
    updateLibraryHeaderMarkup();
    refs.galleryRef.innerHTML = "";
    openWatchedPage();
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

}

