window.onload = async () => {
  const app = document.getElementById("root");
  const container = document.createElement("div");
  container.setAttribute("class", "container");
  app.appendChild(container);
  const encabezado = document.querySelector('.encabezado')
  console.log("enlazado");


  try {
    const response = await fetch('http://localhost:3031/api/movies');
    const peliculas = await response.json();

    let data = peliculas.data;
    console.log(data);

    const enlaces = document.createElement('div')
    const movieAdd = document.createElement('a');
    const favorites = document.createElement('a');

    
    movieAdd.href = "formulario.html";
    favorites.href = "favoritas.html";


    movieAdd.innerText = "Add movies";
    
    favorites.innerText = "Favorite movies";
    enlaces.appendChild(movieAdd);
    enlaces.appendChild(favorites);
    enlaces.classList.add('enlaces-class')



    encabezado.appendChild(enlaces)
    console.log(movieAdd);
    
    let favoriteMovies = localStorage.getItem('favoriteMovies');

    favoriteMovies = favoriteMovies ? JSON.parse(favoriteMovies) : {};
    
    data.forEach((movie) => {
      const card = document.createElement("div");
      card.style.cursor  = 'pointer';
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

      
      {}
      if (favoriteMovies[movie.id]) {
        favorito.classList.add('fa-solid');
        favorito.classList.add('fa-star');
      } else {
        favorito.classList.add('fa-regular');
        favorito.classList.add('fa-star');
      }

      favorito.addEventListener('click', (e) => {
        e.stopPropagation();
        e.preventDefault();

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
    });
  } catch (error) {
    console.log("Error: ", error);
  }
};
