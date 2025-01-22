const searchForm = document.querySelector("form");
const movieContainer = document.querySelector(".movie-container");
const inputBox = document.querySelector(".inputBox");

//fetch movie from api
const getMovieInfo = async (movie) => {
    try{
        const myapiKey = "aa876243";
        const url = `http://www.omdbapi.com/?apikey=${myapiKey}&t=${movie}`;
      
        const response = await fetch(url);
        if(!response.ok){
            throw new Error("unable to fetch movie data");
        }
        const data = await response.json();
      
        showMovieData(data);
    }
  catch(error){
showError("No movie found");
  }
  
};

//movie data show on screen function
const showMovieData = (data) => {
  movieContainer.innerHTML = "";
  movieContainer.classList.remove("noBackground");
  //use content from data obj
  const { Title, imdbRating, Genre, Released, Runtime, Actors, Plot, Poster } =
    data;

  const movieElement = document.createElement("div");
  movieElement.classList.add("movie-info");
  movieElement.innerHTML = `<h2>${Title}</h2>
                          <p><strong>Rating: &#11088;</strong>${imdbRating}<p/>`;
  const movieGenere = document.createElement("div");
  movieGenere.classList.add("movie-genre");
  Genre.split(",").forEach((element) => {
    const p = document.createElement("p");
    p.innerText = element;
    movieGenere.appendChild(p);
  });
  movieElement.appendChild(movieGenere);
  movieElement.innerHTML += `<p><strong>Released Date: </strong>${Released}</p>
                            <p><strong>Duration: </strong>${Runtime}</p>
                            <p><strong>Cast: </strong>${Actors}</p>
                            <p><strong>Plot: </strong>${Plot}</p>`;
  //creating a div for movie poster
  const moviePoster = document.createElement("div");
  moviePoster.classList.add("movie-poster");
  moviePoster.innerHTML = `<img src="${Poster}"/>`;
  movieContainer.appendChild(moviePoster);
  movieContainer.appendChild(movieElement);
};
//show error
const showError = (message) => {
    movieContainer.innerHTML = `<h2>${message}</h2>`;
    movieContainer.classList.add("noBackground");
}

//adding event listner to search form
searchForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const movieName = inputBox.value.trim();
  if (movieName != "") {
    getMovieInfo(movieName);
  }
  else {
    showError("Enter movie name to get information");
  }
});
