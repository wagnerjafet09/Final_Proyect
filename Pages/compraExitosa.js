const orderId = localStorage.getItem('orderId');

const idTransaccionElement = document.getElementById('id-transaccion');

// idTransaccionElement.innerText = `ID de la transacción: ${orderId}`;


const clientId = 'AfTKoM-gOuJzGQ2N0GLaRo_r8Mg3aSZBz69Zqavqysz49tyH504SSGSlETArZOmOcfzSjnTYJ5pbNdRM';
const clientSecret = 'EHMwborGBJuvu6ib1yMieKehE-ENVz7MpJLGS7VA135Z3yjV-ACHvAtK7qu1Sy5hyBsYNxpXA7eWyvgA';

// Función para capturar el pago
const capturePayment = async () => {
  try {
    const response = await fetch(`https://api-m.sandbox.paypal.com/v2/checkout/orders/${orderId}/capture`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Basic ${btoa(`${clientId}:${clientSecret}`)}`
      }
    });

    const data = await response.json();
    console.log(data);
    idTransaccionElement.innerText = `ID de la transacción: ${data.purchase_units[0].payments.captures[0].id}`;

    // Aquí puedes manejar la respuesta de la captura según tus necesidades
  } catch (error) {
    console.error(error);
    // Aquí puedes manejar cualquier error que ocurra durante la captura
  }
};

//Logica para boton Volver
const reservarBtn = document.getElementById('btnVolver');
reservarBtn.addEventListener('click', function () {

  window.location.href = 'http://127.0.0.1:5500/Pages/plantillas/presentacion.html';

});



const idUsuario = localStorage.getItem('userID');
const urlParams = new URLSearchParams(window.location.search);
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
  const datosReserva = {
    idUsuario: idUsuario,
    idLibro: idLibro,
    codigoAleatorio: randomCode
  };

  const opcions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(datosReserva)
  };

  fetch('https://localhost:7037/api/Reserva/ActualizarCodigoAleatorio', opcions)
    .then(response => {
      if (response.ok) {
        return response.json();
      }
      throw new Error('La respuesta de la API no fue exitosa');
    })
    .then(data => {
      console.log('Codigo aleatorio enviado con éxito:', data);
      // window.location.reload();

      localStorage.setItem('randomCode', data.data);

      // Aquí puedes agregar lógica adicional si lo deseas
    })
    .catch(error => {
      console.error('Error al enviar codigo aleatorio:', error);
    });
}


const guardarReserva = async () => {
  // const idUsuario = localStorage.getItem('userID');
  const _idUsuario = idUsuario;
  const _idLibro = idLibro;
  console.log('ID del libro: ' + _idLibro);
  const reservaData = {
    IDUsuario: _idUsuario,
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
      // alert("Reserva exitosa")
      actualizarRandomCode(_idUsuario, _idLibro);
      capturePayment();
      // Aquí puedes realizar cualquier acción adicional después de una reserva exitosa
    } else {
      console.log("Error al reservar: " + data.message);
      // alert("Error al reservar: " + data.message);
      window.location.href = 'http://127.0.0.1:5500/Pages/plantillas/compraFallida.html'
    }
  }).catch(error => {
    console.error('Error al enviar la solicitud:', error);
  });
}


// Llamar a la función de captura de pago
guardarReserva();