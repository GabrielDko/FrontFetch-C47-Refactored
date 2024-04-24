window.onload = async () => {
    const title = document.querySelector('#title');
    const rating = document.querySelector('#rating');
    const awards = document.querySelector('#awards');
    const release_date = document.querySelector('#release_date');
    const length = document.querySelector('#length');
    const agregar = document.querySelector('.botonAgregar');
    const editar = document.querySelector('.botonModificar');
    const eliminar = document.querySelector('.botonBorrar');
    const form = document.querySelector('.formulario');
    const urlParams = new URLSearchParams(window.location.search);
    const movieId = urlParams.get('id');
    const inputs = document.querySelectorAll('input');
    const body = document.querySelector('body')
    const buttons = document.querySelectorAll('button');

    buttons.forEach(button => {
        button.style.cursor = 'pointer';
    })

    const redirect = document.createElement('a');
    redirect.innerHTML = "Home"
    redirect.href = "home.html"
    body.appendChild(redirect)
    function notEmpty(input) {
        input.addEventListener('blur', (e) => {
            if (!input.value.trim()) {
                input.style.backgroundColor = 'red'
            } else {
                input.style.backgroundColor = 'white'
            }

        })
    }

    inputs.forEach(input => {
        notEmpty(input)
    })


    // Verificar si la ruta actual contiene un ID de película
    if (movieId) {
        console.log('Estás en la página de edición de una película');
        try {
            agregar.style.display = "none";

            const response = await fetch(`http://localhost:3031/api/movies/${movieId}`);
            const data = await response.json();
            const movie = data.data;
            title.value = movie.title;
            rating.value = movie.rating;
            awards.value = movie.awards;
            release_date.value = new Date(movie.release_date).toISOString().split('T')[0];
            length.value = movie.length;

            editar.addEventListener('click', async (e) => {
                e.preventDefault();
                const updatedMovie = {
                    title: title.value,
                    rating: rating.value,
                    awards: awards.value,
                    release_date: release_date.value,
                    length: length.value,
                };

                const response = await fetch(`http://localhost:3031/api/movies/update/${movieId}`, {
                    method: 'PUT',
                    headers: {
                        'content-Type': 'application/json'
                    },
                    body: JSON.stringify(updatedMovie)
                });

                if (response.ok) {
                    location.href = 'home.html';
                    console.log('Película actualizada correctamente');
                } else {
                    console.error('Error al actualizar la película:', response.status);
                }
            });

            eliminar.addEventListener('click', async (e) => {
                e.preventDefault();
                const response = await fetch(`http://localhost:3031/api/movies/delete/${movieId}`, {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                    
                });
                if (response.ok) {
                    location.href = 'home.html';
                    console.log('Película Eliminada correctamente');
                } else {
                    console.error('Error al eliminar la película:', response.status);
                }
            })

        } catch (error) {
            console.log("Error:", error);
        }

        console.log(location);
    } else {
        try {
            editar.style.display = "none";

            agregar.addEventListener('click', async (e) => {
                e.preventDefault(); // Evitar que el formulario se envíe automáticamente3
                const movie = {
                    title: title.value,
                    rating: rating.value,
                    awards: awards.value,
                    release_date: release_date.value,
                    length: length.value,
                };

                const response = await fetch('http://localhost:3031/api/movies/create', {
                    method: 'POST',
                    headers: {
                        'content-Type': 'application/json'
                    },
                    body: JSON.stringify(movie)
                })

                if (response.ok) {
                    location.href = 'home.html';
                    console.log('Se ha creado la pelicula correctamente');
                } else {
                    console.log('Ha habido un error al crear la pelicula');
                }

            })
        } catch (error) {

        }
    }
}
