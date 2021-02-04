import Pagination from 'tui-pagination';
// import 'tui-pagination/dist/tui-pagination.css';
import refs from "./refs";
import { updateGalleryMarkup } from "./homePageRander"


const apiKey = '030295876ec9637cb436e167c8c73741';
const baseUrl = 'https://api.themoviedb.org/3';



const container = document.querySelector('#tui-pagination-container');
var options = { // below default value of options
     totalItems: 20000,
     itemsPerPage: 20,
     visiblePages: 5,
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
};
var pagination = new Pagination(container, options);

const paginRef = document.querySelector("#tui-pagination-container");
console.log(paginRef);


paginRef.addEventListener('click', paginationHandler);

function paginationHandler(event) {
  console.log(event)
   if (event.target.nodeName !== 'A') {
      return;
   } else {
     
        refs.galleryRef.innerHTML = '';
     const targetВtn = event.target;
     console.log(targetВtn)
     event.preventDefault()
     if (targetВtn.className === 'tui-page-btn') {
       const targetPage = Number(targetВtn.textContent);
       fetch(`${baseUrl}/trending/movie/day?&page=${targetPage}&api_key=${apiKey}`)
  .then(response => response.json())
  .then(({ results}) => updateGalleryMarkup(results))
  .catch(error => console.log(error));
     }
  
    }
}