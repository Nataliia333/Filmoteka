import refs from './refs';
import { hidePaginationHome } from './pagination';
import { openWatchedPage } from './watchListRander';



refs.myLibraryBtn.addEventListener("click", myLibraryClickHandler);


function myLibraryClickHandler(event) {
  hidePaginationHome();
  updateLibraryHeaderMarkup();
  refs.galleryRef.innerHTML = '';

  openWatchedPage();
}

function updateLibraryHeaderMarkup() {
  const markup = `<ul class="header-library-buttons">
  <div class="form_radio_btn button-header-library watched"">
	<input id="radio-1" type="radio" name="radio" value="watched" checked>
	<label for="radio-1">WATCHED</label>
</div>
 
<div class="form_radio_btn button-header-library">
	<input id="radio-2" type="radio" name="radio" value="queue">
	<label for="radio-2">QUEUE</label>
</div>
  </ul>`;
    refs.libBtnContainer.innerHTML = "";
    refs.libBtnContainer.insertAdjacentHTML('beforeend', markup);
    refs.headerRef.classList.add("header-library");
    headerOrangeLineLibrary();
    
}

function headerOrangeLineLibrary() {
  refs.homeLink.classList.remove("header-orange-style");
  refs.myLibraryBtn.classList.add("header-orange-style");
}



export { myLibraryClickHandler };
