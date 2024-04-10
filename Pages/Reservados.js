let userID = localStorage.getItem("userID");

fetch(`https://localhost:7037/api/Reserva/ReservasConDetalle/${userID}`)
  .then(response => response.json())
  .then(data => {
    // Manipular los datos recibidos (por ejemplo, crear las tarjetas de reserva)
    data.data.forEach(reserva => {
      let reservaItem = `
        <li class="list-group-item">
          <div class="row">
            <div class="col-md-8">
              <h3 class="card-title">${reserva.titulo}</h3>
              <p class="card-text">Autor: ${reserva.autor}</p>
              <p class="card-text">Fecha: ${reserva.fechaHoraReserva}</p>
              <div class="row">
                <div class="col-md-8">
                  <div style="display: flex; width: 200px;">
                    <div class="col-md-4">
                      <a href="#" class="btn btn-primary">Retirar</a>
                    </div>
                    <hr>
                    <div class="col-md-6">
                      <a href="#" class="btn btn-danger">Cancelar</a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="col-md-3">
              <img src="${reserva.urlImagen}" alt="Portada Libro" class="img-fluid"/>
            </div>
          </div>
        </li>
      `;
      if(document.getElementById('lista-reservas') != null){
        document.getElementById('lista-reservas').innerHTML += reservaItem;
      }
      
    });
  })
  .catch(error => console.error('Error:', error));
