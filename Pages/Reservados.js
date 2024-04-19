const userID = localStorage.getItem('userID'); // Obtener ID del usuario del localStorage

// const idUsuario = localStorage.getItem('userID');
// const urlParams = new URLSearchParams(window.location.search);
const idLibro = localStorage.getItem('idLibro');

function generateRandomCode(length) {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let code = '';
  for (let i = 0; i < length; i++) {
    code += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return code;
}

function actualizarRandomCode(idUsuario, idLibro) {
  // Usage
  const randomCode = generateRandomCode(8); // Generate an 8-character random code
  console.log(randomCode);
  const datosPrestamo = {
    idUsuario: idUsuario,
    idLibro: idLibro,
    codigoAleatorio: randomCode
  };

  const opcions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(datosPrestamo)
  };

  fetch('https://localhost:7037/api/Prestamo/ActualizarCodigo', opcions)
    .then(response => {
      if (response.ok) {
        return response.json();
      }
      throw new Error('La respuesta de la API no fue exitosa');
    })
    .then(data => {
      console.log('Codigo aleatorio enviado con éxito:', data);
      // window.location.reload();

      // localStorage.setItem('prestamoCode', data.data);

      // Aquí puedes agregar lógica adicional si lo deseas
    })
    .catch(error => {
      console.error('Error al enviar codigo aleatorio:', error);
    });
}




function retirarReserva(idUsuario, idLibro, randomCode) {
  let confirmando = null;
  confirmando = prompt('Introduzca el codigo para retirar el libro');
  console.log(randomCode);
  // randomCode = localStorage.getItem('reservaCode');
  if (confirmando == randomCode) {
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
        actualizarRandomCode(idUsuario, idLibro);
        alert('Libro retirado con exito 😉');

        // Aquí puedes agregar lógica adicional si lo deseas
      })
      .catch(error => {
        console.error('Error al realizar la operación de préstamo:', error);
        alert('No se ha podido retirar el Libro, intente nuevamente');

      });
  }
  else if (confirmando == null){
    console.log('Cancelado');
  }
  else{
    alert('Codigo incorrecto, intente nuevamente');
  }
}

function cancelarReserva(idReserva) {
  confirmando = confirm('¿Está seguro que desea cancelar la reserva?')
  if (confirmando == true) {
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
        alert('Reserva cancelada con éxito');

      })
      .catch(error => {
        alert('Error al cancelar la reserva');
        console.error('Error al cancelar la reserva:', error);
      });
  }

}

fetch(`https://localhost:7037/api/Reserva/ReservasConDetalle/${userID}`)
  .then(response => response.json())
  .then(data => {
    let totalReservas = 0;
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
                    <a href="#" class="btn btn-primary" onclick="retirarReserva(${userID}, ${reserva.idLibro}, '${reserva.codigoAleatorio}')">Retirar</a>
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
      if (document.getElementById('lista-reservas') != null) {
        document.getElementById('lista-reservas').innerHTML += reservaItem;
      }
      totalReservas += 1;
      const mensaje = document.getElementById('totalReservas');
      mensaje.innerText = `Total de reservas: ${totalReservas}`;

    });
  })
  .catch(error => console.error('Error:', error));
