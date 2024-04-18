function cargarLibros(){
  // Realizar una solicitud HTTP GET a tu endpoint de libros
fetch('https://localhost:7037/api/Libro')
.then(response => response.json())
.then(data => {
  document.getElementById('card-father').innerHTML = '';

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
}


  function buscar() {
    var searchTerm = document.getElementById('searchInput').value;
    if(searchTerm != ""){
      fetch(`https://localhost:7037/api/Libro/searchTerm?searchTerm=${searchTerm}`)
    .then(response => response.json() )
    
  .then(data => {
    if(data.success == true){
      document.getElementById('card-father').innerHTML = '';

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
    }
    
  })
  .catch(error => console.error('Error:', error));
    }
    else{
      cargarLibros();
    }
}

cargarLibros();