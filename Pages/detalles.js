
    console.log('hola');
    // Obtener todos los botones de detalles
    const urlParams = new URLSearchParams(window.location.search);
    const idLibro = urlParams.get('id');

    //Logica para boton Reservar
    const reservarBtn = document.getElementById('reservarBtn');
        reservarBtn.addEventListener('click', function() {
            const idUsuario = localStorage.getItem('userID'); // Obtener ID del usuario del localStorage
            const _idLibro = idLibro;
            console.log('ID del libro: '+_idLibro);
            const reservaData = {
                IDUsuario: idUsuario,
                IDLibro: _idLibro
            };
    
            fetch('https://localhost:7037/api/Reserva/NuevaReserva', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(reservaData)
            }).then(response => {
                if (response.ok) {
                    return response.json();
                }
                throw new Error('La respuesta de la API no fue exitosa');
            }).then(data => {
                if (data.success) {
                    console.log("Reserva exitosa");
                    alert("Reserva exitosa")
                    // Aquí puedes realizar cualquier acción adicional después de una reserva exitosa
                } else {
                    console.log("Error al reservar: " + data.message);
                    alert("Error al reservar: " + data.message)
                }
            }).catch(error => {
                console.error('Error al enviar la solicitud:', error);
            });
        });

    
    //Logica para entrar a Detalles del libro

    // Realizar la lógica necesaria con el ID del libro
    console.log('ID del libro:', idLibro);

    fetch(`https://localhost:7037/api/Libro/${idLibro}`)
        .then(response => response.json())
        .then(data => {
            userID = localStorage.getItem('userID');
            console.log('Usuario ID: '+userID);
            // Asignar los valores obtenidos a los elementos HTML correspondientes
            document.getElementById('tituloLibro').innerText = data.data.titulo;
            document.getElementById('autorLibro').innerText = data.data.autor;
            document.getElementById('generoLibro').innerText = data.data.genero;
            document.getElementById('descripcionLibro').innerText = data.data.descripcion;
            document.getElementById('imagenLibro').src = data.data.urlImagen;
        })
        .catch(error => console.error('Error:', error));



        