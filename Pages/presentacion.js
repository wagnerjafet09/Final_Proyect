// script.js

// Realizar una solicitud HTTP GET a tu endpoint de libros
fetch('https://localhost:7037/api/Libro')
  .then(response => response.json())
  .then(data => {
    // Manipular los datos recibidos (por ejemplo, crear las tarjetas de libro)
    data.data.forEach(libro => {
      let card = `
        <div class="card" style="width: calc(20% - 15px); margin-bottom: 20px; color: black !important;">
          <img class="card-img-top" src="${libro.urlImagen}" alt="Card image cap">
          <div class="card-body" style="color: black !important;">
            <h5 class="card-title">${libro.titulo}</h5>
            <a href="/Pages/plantillas/detalles.html?id=${libro.id}" class="btn btn-dark">Detalles</a>
          </div>
        </div>
      `;
      if(document.getElementById('card-father') != null){
        document.getElementById('card-father').innerHTML += card;
      }
      
    });
  })
  .catch(error => console.error('Error:', error));


  // presentacion.js

// // Función para manejar el clic en el botón "Detalles"
// function mostrarDetalles(id) {
//     // Redirigir a la página de detalles del libro con el ID específico
//     window.location.href = `/Pages/plantillas/detalles.html?id=${id}`;
//   }
  
//   // Agregar un event listener a todos los botones "Detalles" de los libros
//   document.querySelectorAll('.btn-detalle').forEach(btn => {
//     btn.addEventListener('click', () => {
//       // Obtener el ID del libro desde el atributo data-id del botón
//       let idLibro = btn.getAttribute('data-id');
//       mostrarDetalles(idLibro);
//     });
//   });