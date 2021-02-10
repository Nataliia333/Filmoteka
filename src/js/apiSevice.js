const apiKey = '030295876ec9637cb436e167c8c73741';
const baseUrl = 'https://api.themoviedb.org/3';

function fetchTrands(page) {
  return fetch(
    `${baseUrl}/trending/movie/day?&page=${page}&api_key=${apiKey}`,
  ).then(response => response.json());
}

function getMovieById(movieId) {
  return fetch(`${baseUrl}/movie/${movieId}?api_key=${apiKey}`)
    .then(response => response.json())
  
}


function movieQueryFetch(inputValue, page) {
  return fetch(`${baseUrl}/search/movie?api_key=${apiKey}&query=${inputValue}&page=${page}`)
        .then(response => response.json())
      }


export {fetchTrands, getMovieById, movieQueryFetch}