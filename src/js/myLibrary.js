import refs from "./refs"


refs.myLibraryBtn.addEventListener("click", myLibraryClickHandler);

function myLibraryClickHandler(event) {
    updateLibraryMarkup()
}

function updateLibraryMarkup() {
    const markup = `
      <ul class="header-library-buttons">
          <li><button class="button-header-library">Watched</button></li> 
          <li><button class="button-header-library">Queue</button></li>
      </ul>`;
    refs.libBtnContainer.innerHTML = "";
    refs.libBtnContainer.insertAdjacentHTML('beforeend', markup);
    refs.headerRef.classList.add("header-library");

}

export default updateLibraryMarkup;