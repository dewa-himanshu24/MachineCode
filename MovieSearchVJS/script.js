// const movies = [
//     { Title: "Harry Potter", Genre: "Fantasy" },
//     { Title: "Inception", Genre: "Sci-Fi" },
//     { Title: "The Dark Knight", Genre: "Action" },
//     { Title: "The Godfather", Genre: "Drama" },
//     { Title: "Pulp Fiction", Genre: "Drama" },
//     { Title: "Hamilton", Genre: "Drama" }
// ];

const URL = 'https://gist.githubusercontent.com/saniyusuf/406b843afdfb9c6a86e25753fe2761f4/raw/523c324c7fcc36efab8224f9ebb7556c09b69a14/Film.JSON'

let movies = [];

const movieContainer = document.getElementById('movie-list');
const searchInput = document.getElementById('search-input');
const genreFilter = document.getElementById('genre-filter');


async function fetchMovies() {

  movieContainer.innerHTML = '<p>Loading Movies...</p>'

  try {
    const response = await fetch(URL);

    if (!response.ok) throw new Error('Network respinse not ok');

    movies = await response.json();

    console.log('~movies', movies);

    renderMovie(movies);
    populateGenre(movies);

  } catch(e) {
    movieContainer.innerHTML = '<p style="color:red">Error loading movies: </p>'
  } finally {

  }
}

function populateGenre(moviesData) {
  let genreSet = new Set();

  moviesData.forEach(movie => {
    movie.Genre.split(', ').forEach((item) => genreSet.add(item));
  })

  console.log('~genreSet', genreSet);

  genreSet.forEach((genre) => {
    const option = document.createElement('option');
    option.value = genre;
    option.textContent = genre;
    genreFilter.appendChild(option);
  })
}


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
      <h3>${movie.Title}</h3>
      <span>${movie.Genre}</span>
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

    const matchesGenere = selectedGenre === 'all' || movie.Genre.includes(selectedGenre);

    const matchesSearch = movie.Title.toLowerCase().includes(query) || handleSubstringMatch(query, movie.Title);

    return matchesSearch && matchesGenere;
  })

  renderMovie(filtered);
}

searchInput.addEventListener('input', handleFilter);
genreFilter.addEventListener('change', handleFilter);

// renderMovie(movies);
fetchMovies();
