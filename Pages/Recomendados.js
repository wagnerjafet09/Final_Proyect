userID = localStorage.getItem("userID");

fetch(`https://localhost:7037/api/Libro/LibrosRecomendados?UsuarioID=${userID}`)
  .then(response => response.json())
  .then(data => {
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
