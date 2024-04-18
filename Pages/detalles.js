
const idUsuario = localStorage.getItem('userID'); // Obtener ID del usuario del localStorage
// Obtener todos los botones de detalles
const urlParams = new URLSearchParams(window.location.search);
const idLibro = urlParams.get('id');
localStorage.setItem('idLibro', idLibro);


//PASARELA DE PAGOS


const clientId = 'AfTKoM-gOuJzGQ2N0GLaRo_r8Mg3aSZBz69Zqavqysz49tyH504SSGSlETArZOmOcfzSjnTYJ5pbNdRM';
const clientSecret = 'EHMwborGBJuvu6ib1yMieKehE-ENVz7MpJLGS7VA135Z3yjV-ACHvAtK7qu1Sy5hyBsYNxpXA7eWyvgA';
let orderId;
let approve;

const createOrder = async (productName, description) => {
  try {
    const response = await fetch('https://api-m.sandbox.paypal.com/v2/checkout/orders', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Basic ${btoa(`${clientId}:${clientSecret}`)}`
      },
      body: JSON.stringify({
        intent: 'CAPTURE',
        purchase_units: [
          {
            items: [
              {
                name: productName,
                description: description,
                quantity: '1',
                unit_amount: {
                  currency_code: 'USD',
                  value: '9.99'
                }
              }
            ],
            amount: {
              currency_code: 'USD',
              value: '9.99',
              breakdown: {
                item_total: {
                  currency_code: 'USD',
                  value: '9.99'
                }
              }
            }
          }
        ],
        application_context: {
          return_url: 'http://127.0.0.1:5500/Pages/plantillas/compraExitosa.html',
          cancel_url: 'http://127.0.0.1:5500/Pages/plantillas/presentacion.html'
        }
      })
    });

    const data = await response.json();
    console.log(data);
    orderId = data.id;
    localStorage.setItem('orderId', orderId);
    // localStorage.setItem('transaccionId', data.purchase_units);
    approve = data.links[1].href;
    // console.log(data.links[1].href);
    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};




//Logica para boton Reservar
const reservarBtn = document.getElementById('reservarBtn');
reservarBtn.addEventListener('click', function () {

  console.log(approve);
  window.location.href = approve;
  console.log('funciona?');

});


//Logica para entrar a Detalles del libro

let nombreProducto, descripcionProducto;

// Realizar la lógica necesaria con el ID del libro
console.log('ID del libro:', idLibro);

fetch(`https://localhost:7037/api/Libro/${idLibro}`)
  .then(response => response.json())
  .then(data => {
    userID = localStorage.getItem('userID');
    console.log('Usuario ID: ' + userID);
    // Asignar los valores obtenidos a los elementos HTML correspondientes
    document.getElementById('tituloLibro').innerText = data.data.titulo;
    document.getElementById('autorLibro').innerText = data.data.autor;
    document.getElementById('generoLibro').innerText = data.data.genero;
    document.getElementById('descripcionLibro').innerText = data.data.descripcion;
    document.getElementById('imagenLibro').src = data.data.urlImagen;
    nombreProducto = data.data.titulo;
    descripcionProducto = data.data.genero;
    createOrder(nombreProducto, descripcionProducto);
    console.log(localStorage.getItem('orderId'));
    // console.log(localStorage.getItem('transaccionId'));
  })
  .catch(error => console.error('Error:', error));




