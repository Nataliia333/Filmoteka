import Pagination from 'tui-pagination';
import refs from "./refs";
import { updateGalleryMarkup, fetchTrands } from "./homePageRander";
import genres from "./genres";





let targetPage = 1;


function startPaginate(totalAmountOfFilms) {
    const options = {
        totalItems: totalAmountOfFilms,
        itemsPerPage: 20,
        visiblePages: 8,
        page: 1,
        centerAlign: false,
        firstItemClassName: 'tui-first-child',
        lastItemClassName: 'tui-last-child',
        template: {
            page: '<a href="#" class="tui-page-btn">{{page}}</a>',
            currentPage: '<strong class="tui-page-btn tui-is-selected">{{page}}</strong>',
            moveButton:
                '<a href="#" class="tui-page-btn tui-{{type}}">' +
                '<span class="tui-ico-{{type}}">{{type}}</span>' +
                '</a>',
            disabledMoveButton:
                '<span class="tui-page-btn tui-is-disabled tui-{{type}}">' +
                '<span class="tui-ico-{{type}}">{{type}}</span>' +
                '</span>',
            moreButton:
                '<a href="#" class="tui-page-btn tui-{{type}}-is-ellip">' +
                '<span class="tui-ico-ellip">...</span>' +
                '</a>'
        }
    }
    const home = new Pagination(refs.pageContainerH, options);
    
    }


refs.pageContainerH.addEventListener('click', homePaginationHandler);





function homePaginationHandler(event) {
  refs.galleryRef.innerHTML = '';
    const targetВtn = event.target;

    switch (targetВtn.className) {
        case 'tui-page-btn':
            targetPage = Number(targetВtn.textContent);
               console.log(targetPage)
            fetchTrands(targetPage).then(({ results }) => updateGalleryMarkup(results, genres));
            return;
         case 'tui-page-btn tui-prev':
            targetPage -=1
              console.log(targetPage)
              fetchTrands(targetPage).then(({ results }) => updateGalleryMarkup(results, genres));
            return;
         case 'tui-ico-prev':
            targetPage -=1
              console.log(targetPage)
             fetchTrands(targetPage).then(({ results }) => updateGalleryMarkup(results, genres));
            return;
        case 'tui-page-btn tui-next':
            targetPage += 1;
            console.log(targetPage);
            fetchTrands(targetPage).then(({ results }) => updateGalleryMarkup(results, genres));
            return;
        case 'tui-ico-next':
             targetPage += 1;
            console.log(targetPage);
            fetchTrands(targetPage).then(({ results }) => updateGalleryMarkup(results, genres));
            return;
        case 'tui-page-btn tui-is-selected tui-first-child':
            targetPage = 1;
            fetchTrands(targetPage).then(({ results }) => updateGalleryMarkup(results, genres));
            return;
         case 'tui-ico-first':
        targetPage = 1;
        fetchTrands(targetPage).then(({ results }) => updateGalleryMarkup(results, genres));
            return;
         case 'tui-page-btn tui-first':
        targetPage = 1;
            fetchTrands(targetPage).then(({ results }) => updateGalleryMarkup(results, genres));
            return;
         case 'tui-page-btn tui-last':
            targetPage = 1000;
        fetchTrands(targetPage).then(({ results }) => updateGalleryMarkup(results, genres));
            return;
           case 'tui-ico-last':
            targetPage = 1000;
            fetchTrands(targetPage).then(({ results}) => updateGalleryMarkup(results, genres));
           return;
case 'tui-page-btn tui-first-child':
        targetPage = 1;
         fetchTrands(targetPage).then(({ results }) => updateGalleryMarkup(results, genres));
            return;
        case 'tui-page-btn tui-last-child':
        targetPage = 1000;
         fetchTrands(targetPage).then(({ results }) => updateGalleryMarkup(results, genres));
            return;
     default:
         fetchTrands(targetPage).then(({ results }) => updateGalleryMarkup(results, genres));
        return;
    }
}



  
function hidePaginationHome() {
   refs.pageContainerH.classList.add("is-hidden") 
}


function showPaginationHome() {
    refs.pageContainerH.classList.remove("is-hidden") 
}



export {
    startPaginate,
hidePaginationHome,
    showPaginationHome,
  }