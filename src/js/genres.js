const genres = [
    { id: 28, name: "Action" },
    { id: 12, name: "Adventure" },
    { id: 16, name: "Animation" },
    { id: 35, name: "Comedy" },
    { id: 80, name: "Crime" },
    { id: 99, name: "Documentary" },
    { id: 18, name: "Drama" },
    { id: 10751, name: "Family" },
    { id: 14, name: "Fantasy" },
    { id: 36, name: "History" },
    { id: 27, name: "Horror" },
    { id: 10402, name: "Music" },
    { id: 9648, name: "Mystery" },
    { id: 10749, name: "Romance" },
    { id: 878, name: "Science Fiction" },
    { id: 10770, name: "TV Movie" },
    { id: 53, name: "Thriller" },
    { id: 10752, name: "War" },
    { id: 37, name: "Western" },
];


function genreTransform(data, genres) { 
  data.map((item) => {
    let newGenres = [];
    item.genre_ids.map((id) => {
      const found = genres.find((item) => item.id === id);

      newGenres.push(found.name);
    });
    if (newGenres.length >= 3) {
      const normalizedGenres = newGenres.slice(0, 2);
      normalizedGenres.push("Other");
      item.genre_ids = normalizedGenres.join(', ')
      item.release_date = item.release_date.slice(0, 4);
    } else {
      item.genre_ids = newGenres.join(', ');
      if (item.release_date) item.release_date = item.release_date.slice(0, 4);
    }
    return item;
  });
}

function normalizeGenres(data) {
  const newGenres = data.genres.slice(0, 2).map(({ name }) => name);
  data.genres = newGenres.join(', ');
  
}


export default genres;
export { genreTransform, normalizeGenres };