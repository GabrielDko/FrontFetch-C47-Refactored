window.onload = async () => {
  const app = document.getElementById("root");
  const container = document.createElement("div");
  container.setAttribute("class", "container");
  app.appendChild(container);

  try {
    const response = await fetch('http://localhost:3031/api/movies');
    const peliculas = await response.json();

    
    let favoriteMovies = localStorage.getItem('favoriteMovies');
    
    favoriteMovies = favoriteMovies ? JSON.parse(favoriteMovies) : {};

    const data = peliculas.data;

    let moviesFound = false;

    Object.keys(favoriteMovies).forEach((movieId) => {
      const movie = data.find((movie) => movie.id === parseInt(movieId));
      if (movie) {
        moviesFound = true;

        const card = document.createElement("div");
        card.style.cursor = 'pointer';
        card.setAttribute("class", "card");

        card.addEventListener('click', () => {
          window.location.href = `formulario.html?id=${movie.id}`;
        });

        const h1 = document.createElement("h1");
        h1.textContent = movie.title;

        const p = document.createElement("p");
        p.textContent = `Rating: ${movie.rating}`;

        const duracion = document.createElement("p");
        duracion.textContent = `Duración: ${movie.length}`;

        const favorito = document.createElement('i');
        favorito.id = movie.id;

        if (favoriteMovies[movie.id]) {
          favorito.classList.add('fa-solid');
          favorito.classList.add('fa-star');
        } else {
          favorito.classList.add('fa-regular');
          favorito.classList.add('fa-star');
        }

        favorito.addEventListener('click', (e) => {
          
          e.stopPropagation();

          if (favoriteMovies[movie.id]) {
            delete favoriteMovies[movie.id];
            favorito.classList.remove('fa-solid');
            favorito.classList.add('fa-regular');
          } else {
            favoriteMovies[movie.id] = true;
            favorito.classList.remove('fa-regular');
            favorito.classList.add('fa-solid');
          }
          localStorage.setItem('favoriteMovies', JSON.stringify(favoriteMovies));
        });

        container.appendChild(card);
        card.appendChild(h1);
        card.appendChild(p);
        if (movie.genre !== null) {
          const genero = document.createElement("p");
          genero.textContent = `Género: ${movie.genre.name}`;
          card.appendChild(genero);
        }
        card.appendChild(duracion);

        card.appendChild(favorito);
      }
    });

    // Mostrando mensaje al usuario si no se encuentran peliculas :DDDDDDDDDDDDDDDDD
    if (!moviesFound) {
      const noMovies = document.createElement('h2');
      noMovies.innerText = 'No tienes películas favoritas.'
      container.appendChild(noMovies);
    }
  } catch (error) {
    console.log("Error: ", error);
  }
};
