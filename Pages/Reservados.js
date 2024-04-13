let userID = localStorage.getItem("userID");

function generateRandomCode(length) {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let code = '';
  for (let i = 0; i < length; i++) {
      code += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return code;
}

function retirarReserva(idUsuario, idLibro) {
  // Usage
const randomCode = generateRandomCode(8); // Generate an 8-character random code
console.log(randomCode);

  confirmando = confirm('¿Está seguro que desea retirar el libro?')
  if(confirmando == true){
    const datosPrestamo = {
      idUsuario: idUsuario,
      idLibro: idLibro
    };
  
    const opciones = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(datosPrestamo)
    };
  
    fetch('https://localhost:7037/api/Prestamo/GestionPrestamo', opciones)
      .then(response => {
        if (response.ok) {
          return response.json();
        }
        throw new Error('La respuesta de la API no fue exitosa');
      })
      .then(data => {
        console.log('Operación de préstamo realizada con éxito:', data);
        window.location.reload(); // Recargar la página

        // Aquí puedes agregar lógica adicional si lo deseas
      })
      .catch(error => {
        console.error('Error al realizar la operación de préstamo:', error);
      });
  }
}

function cancelarReserva(idReserva) {
  confirmando = confirm('¿Está seguro que desea cancelar la reserva?')
  if(confirmando == true){
    const opciones = {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      }
    };
  
    fetch(`https://localhost:7037/api/Reserva/CancelarReserva/${idReserva}`, opciones)
      .then(response => {
        if (response.ok) {
          return response.json();
        }
        throw new Error('La respuesta de la API no fue exitosa');
      })
      .then(data => {
        window.location.reload(); // Recargar la página
        console.log('Reserva cancelada con éxito:', data);
  
      })
      .catch(error => {
        console.error('Error al cancelar la reserva:', error);
      });
  }
  
}

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
                    <a href="#" class="btn btn-primary" onclick="retirarReserva(${userID}, ${reserva.idLibro})">Retirar</a>
                    </div>
                    <hr>
                    <div class="col-md-6">
                      <a href="#" class="btn btn-danger" onclick="cancelarReserva(${reserva.idReserva})">Cancelar</a>
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
