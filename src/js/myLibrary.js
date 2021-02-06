import refs from "./refs"
import { hidePaginationHome } from "./pagination";
import {openWatchedPage} from "./watchListRander"


refs.myLibraryBtn.addEventListener("click", myLibraryClickHandler);
// refs.myLibraryBtnModal.addEventListener("click", myLibraryClickHandler, hideModal);

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
    // refs.headerBtn.classList.remove("header-orange-style");
    // refs.myLibraryBtn.classList.add("header-orange-style");
    // hideModal()
}


// function hideModal() {
//   refs.backdropRef.classList.remove('is-open');
// }


