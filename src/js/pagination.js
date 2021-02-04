import Pagination from 'tui-pagination';
// import 'tui-pagination/dist/tui-pagination.css';
import refs from "./refs";
import { updateGalleryMarkup, homePageLoad, fetchTrands } from "./homePageRander";
import genres from "./genres";
import {genreTransform} from "./genres"




let targetPage = 1;



function startPaginate(total_results) {
    const options = {
        totalItems: `${total_results}`,
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
    new Pagination(refs.pageContainer, options);
    }


refs.pageContainer.addEventListener('click', paginationHandler);


function paginationHandler(event) {
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

export {startPaginate, paginationHandler}