const API_KEY = "285deede9bd85a8ae1bf99a74c8cbf01";
const API_URL =
  "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=" +
  API_KEY +
  "&page=1";
// console.log(API_URL);
const IMG_PATH = "https://image.tmdb.org/t/p/w1280";
const SEARCH_API = "https://api.themoviedb.org/3/search/movie?&query=";

const main = document.getElementById("main");
const form = document.getElementById("form");
const search = document.getElementById("search");

// Get initial movies
getMovies(API_URL);

async function getMovies(url) {
  const response = await fetch(url);
  const data = await response.json();

    console.log(data.results);
  showMovies(data.results);
}

function showMovies(movies) {
  main.innerHTML = "";

  movies.forEach((movie) => {
    const { title, poster_path, vote_average, overview } = movie;
    // console.log({ title, poster_path, vote_average, overview });

    const movieEl = document.createElement("div");
    movieEl.classList.add("movie");
    movieEl.innerHTML = `
     
        <img src="${IMG_PATH}${poster_path}" alt="" />
        <div class="movie-info">
          <h3>${title}</h3>
          <span class="${getClassByRate(vote_average)}">${vote_average}</span>
        </div>
        <div class="overview">
          <h3>Overview</h3>
          ${overview}
        </div>
    `;
    main.appendChild(movieEl);
  });
}

function getClassByRate(vote) {
  if (vote >= 8) {
    return "green";
  } else if (vote >= 5) {
    return "orange";
  } else {
    return "red";
  }
}

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const searchTerm = search.value;

  if (searchTerm && searchTerm !== "") {
    // const resultSearch = SEARCH_API + searchTerm + "&api_key=" + API_KEY;
    const resultSearch = `${SEARCH_API}${searchTerm}&api_key=${API_KEY}`;

    getMovies(resultSearch);

    search.value = "";
    // console.log(searchTerm);
    // console.log(resultSearch);
  } else {
    window.location.reload();
  }
});
