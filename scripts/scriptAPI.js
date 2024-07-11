// Definimos la URL base de la API de The Movie DB
const API_SERVER = 'https://api.themoviedb.org/3'; //esto se cambiara por una api propia que tenga las peliculas en la base de mysql


const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0NWNjODNmOGJlYzgxNzU5Njc2Y2M3MDZkYWNlODk2OCIsInN1YiI6IjY2NDdiNzNlNGVkMDQwYjM5MjJkZmM2MCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.R7QhLm6wY_CzOFF227ynFBSfnRSbeI5XH-XWjyOZu4k'
    }
  };
//variable para saber en que pagina estoy
let pagina = 1;




// Función para cargar películas en la cuadrícula de tendencias
const fetchMoviesGrid = async (page = 1) => {
    try {
        // Limpiamos el contenido previo del contenedor
        movies.innerHTML = '';
        // Realizamos una petición fetch a la API para obtener las películas populares
        const response = await fetch(`${API_SERVER}/movie/popular?page=${page}`, options);
    
        // Convertimos la respuesta a JSON
        const data = await response.json();

        data.results.forEach(media => {
            const movieCard = createMovieCard(media);
            movies.appendChild(movieCard);         
        });
    } catch (error) {
        console.error("Error fetching data:", error);
    }
    //guardo el valor de la pagina actual
    pagina = page;
};



function createMovieCard(media) {
    const { title, name, overview, release_date, poster_path } = media;

    const movieCard = document.createElement("div");
    movieCard.classList.add("movie_item")

    movieCard.innerHTML = `
    
      <div class="col">
       <div class="card shadow-sm">
          <img src="https://image.tmdb.org/t/p/w500/${poster_path}" class="movie_img">
          <div class = "title">${title || name} </div>
          <div class="card-body">           
             <div class="d-flex justify-content-between align-items-center">
                 <div class="btn-group">
                  <button type="button" class="btn btn-sm btn-outline-secondary">Ver</button>
                 </div>
                 <small class="text-body-secondary">${release_date}</small>
             </div>
          </div>
       </div>   
      </div> 
   
       `;

    return movieCard;
}

// Event listener para el botón "Anterior"
document.querySelector('.anterior').addEventListener('click', () => {    
    // Si es la primera página, no hacemos nada
    if (pagina <= 1) return;
    // Cargar las películas de la página anterior
    fetchMoviesGrid(pagina - 1);
});

// Event listener para el botón "Siguiente"
document.querySelector('.siguiente').addEventListener('click', () => {    
    // Cargar las películas de la página siguiente
    fetchMoviesGrid(pagina + 1);
});


fetchMoviesGrid();









// Función para crear elementos HTML
const createElement = (tag, className, attributes = {}) => {
    // Creamos un nuevo elemento HTML del tipo especificado (tag)
    const element = document.createElement(tag);
    
    // Si se especificó una clase, la añadimos al elemento
    if (className) {
        element.classList.add(className);
    }
    
    // Iteramos sobre los atributos pasados como argumento y los añadimos al elemento
    Object.entries(attributes).forEach(([key, value]) => element.setAttribute(key, value));
    
    // Devolvemos el elemento creado
    return element;
};

// Función para cargar películas en el carrusel de películas Carrusel
const fetchMoviesFlex = async () => {
    // Realizamos una petición fetch a la API para obtener las películas más aclamadas
    const response = await fetch(`${API_SERVER}/movie/top_rated`, options);
    
    // Convertimos la respuesta a JSON
    const data = await response.json();
    
    // Extraemos las películas de la respuesta
    const movies = data.results;

    // Seleccionamos el contenedor de películas aclamadas en el DOM
    const aclamadasContainer = document.querySelector('.aclamadas');
    
    // Iteramos sobre cada película obtenida
    movies.forEach(movie => {
        // Creamos los elementos HTML para mostrar la película
        const peliculaItem = createElement('div', 'peliculaItem');
        const img = createElement('img', 'imgAclamada', {
            src: `https://image.tmdb.org/t/p/w500/${movie.poster_path}`,
            alt: movie.title,
            loading: 'lazy'
        });
        
        // Agregamos los elementos al DOM
        peliculaItem.appendChild(img); // Agregamos la imagen al contenedor de la película
        aclamadasContainer.appendChild(peliculaItem); // Agregamos el contenedor de la película al contenedor de películas aclamadas
    });
};

fetchMoviesFlex();





