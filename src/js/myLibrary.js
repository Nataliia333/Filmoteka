import refs from './refs';
import { hidePaginationHome } from './pagination';
import { openWatchedPage } from './watchListRander';
// import {openQueuePage} from "./queueListRander"
import { watchedClickHandler } from "./watchListRander"
import {queueClickHandler} from "./queueListRander"



refs.myLibraryBtn.addEventListener("click", myLibraryClickHandler);


function myLibraryClickHandler(event) {
  hidePaginationHome();
  updateLibraryHeaderMarkup();
  refs.galleryRef.innerHTML = '';
openWatchedPage();
}

function updateLibraryHeaderMarkup() {
  const markup = `<ul class="header-library-buttons">
  <div class="form_radio_btn button-header-library">
	<input  class="watched-button" id="radio-1" type="radio" name="radio" value="watched" checked>
	<label for="radio-1">WATCHED</label>
</div>
 
<div class="form_radio_btn button-header-library">
	<input class="queue-button"  id="radio-2" type="radio" name="radio" value="queue">
	<label for="radio-2">QUEUE</label>
</div>
  </ul>`;
    refs.libBtnContainer.innerHTML = "";
    refs.libBtnContainer.insertAdjacentHTML('beforeend', markup);
    refs.headerRef.classList.add("header-library");
    headerOrangeLineLibrary();
  const watchedBtn = document.querySelector(".watched-button");
  const queuedBtn = document.querySelector(".queue-button");
  watchedBtn.addEventListener("click", watchedClickHandler);
  queuedBtn.addEventListener("click", queueClickHandler)
}


function headerOrangeLineLibrary() {
  refs.homeLink.classList.remove("header-orange-style");
  refs.myLibraryBtn.classList.add("header-orange-style");
}



export { myLibraryClickHandler };
