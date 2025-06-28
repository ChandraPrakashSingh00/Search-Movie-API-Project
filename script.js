const apiKey = "76e5ea6a"; 

function toggleMode() {
  document.body.classList.toggle("dark-mode");
}

async function searchMovie() {
  const searchInput = document.getElementById("searchInput").value.trim();
  const result = document.getElementById("result");

  if (!searchInput) {
    result.innerHTML = "<p>Please enter a movie title.</p>";
    return;
  }

  result.innerHTML = "<p>Loading...</p>";

  try {
    const response = await fetch(`https://www.omdbapi.com/?apikey=${apiKey}&s=${searchInput}`);
    const data = await response.json();

    if (data.Response === "True") {
      result.innerHTML = data.Search.map(movie => `
        <div class="movie">
          <img src="${movie.Poster !== 'N/A' ? movie.Poster : 'https://via.placeholder.com/180x270?text=No+Image'}" alt="${movie.Title}" />
          <h3>${movie.Title}</h3>
          <p>${movie.Year} (${movie.Type})</p>
        </div>
      `).join("");
    } else {
      result.innerHTML = `<p>${data.Error}</p>`;
    }
  } catch (error) {
    result.innerHTML = "<p>Something went wrong. Please try again.</p>";
    console.error(error);
  }
}
