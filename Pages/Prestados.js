let userID = localStorage.getItem("userID");


fetch(`https://localhost:7037/api/Prestamo/PrestamosConDetalle/${userID}`)
  .then(response => response.json())
  .then(data => {
    data.data.forEach(prestamo => {
      let prestamoItem = `
        <li class="list-group-item">
          <div class="d-flex align-items-center justify-content-between">
              <div class="media">
                  <img src="${prestamo.urlImagen}" class="mr-3" alt="Portada del libro" style="width: 110px; height: auto;">
                  <div class="media-body">
                    <div>
                      <h5 class="mt-0 mb-1">${prestamo.titulo}</h5>
                    </div>
                    <div class="row">
                        <div class="col-md-4">
                            <p>Autor: ${prestamo.autor}</p>
                        </div>
                        <div class="col-md-4">
                            <p>Estado: ${prestamo.estado}</p>
                        </div>
                        <div class="col-md-4">
                          <p>Devolucion: ${prestamo.fechaHoraDevolucion}</p>
                      </div>
                    </div>
                      <!-- Puedes agregar más información del libro aquí -->
                  </div>
              </div>
              <button class="btn btn-primary" onclick="devolverLibro(${prestamo.idUsuario}, ${prestamo.idLibro})">Devolver</button>
          </div>
        </li>
      `;
      if (document.getElementById('lista-prestamos') != null) {
        document.getElementById('lista-prestamos').innerHTML += prestamoItem;
      }
    });
  })
  .catch(error => console.error('Error:', error));

function devolverLibro(idUsuario, idLibro) {
  confirmando = window.confirm('Está seguro de que va a devolver este Libro');
  if (confirmando == true) {
    fetch('https://localhost:7037/api/Prestamo/DevolucionLibro', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        idUsuario: idUsuario,
        idLibro: idLibro
      })
    })
      .then(response => {
        if (response.ok) {
          alert('Libro devuelto exitosamente');
          location.reload(); // Recarga la página después de devolver el libro
        } else {
          alert('Error al devolver el libro');
        }
      })
      .catch(error => console.error('Error:', error));
  }

}

