const movies = [
    { title: "Harry Potter", genre: "Fantasy" },
    { title: "Inception", genre: "Sci-Fi" },
    { title: "The Dark Knight", genre: "Action" },
    { title: "The Godfather", genre: "Drama" },
    { title: "Pulp Fiction", genre: "Drama" },
    { title: "Hamilton", genre: "Drama" }
];

const movieContainer = document.getElementById('movie-list');
const searchInput = document.getElementById('search-input');
const genreFilter = document.getElementById('genre-filter');


// First Create Card From list
function renderMovie(filteredMovies) {
  movieContainer.innerHTML = '';

  if (filteredMovies.length === 0) {
    movieContainer.innerHTML = '<p>No Movies Found</p>';
    return;
  }

  filteredMovies.forEach((movie) => {
    const card = document.createElement('div');
    card.className = 'movie-card';
    card.innerHTML = `
      <h3>${movie.title}</h3>
      <span>${movie.genre}</span>
    `;

    movieContainer.appendChild(card);
  })
}

function handleSubstringMatch(query, movieName) {
  let i = 0;
  let j = 0;

  movieName = movieName.toLowerCase();

  while (i<query.length && j < movieName.length) {
    if (query[i] === movieName[j]) {
      i++;
    }
    j++;
  }

  return i === query.length;
}

function handleFilter() {
  const query = searchInput.value.toLowerCase();
  const selectedGenre = genreFilter.value;

  const filtered = movies.filter(movie => {

    const matchesGenere = selectedGenre === 'all' || movie.genre === selectedGenre;

    const matchesSearch = movie.title.toLowerCase().includes(query) || handleSubstringMatch(query, movie.title);

    return matchesSearch && matchesGenere;
  })

  renderMovie(filtered);
}

searchInput.addEventListener('input', handleFilter);
genreFilter.addEventListener('change', handleFilter);

renderMovie(movies);
