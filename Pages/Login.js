// function enviarSolicitud(event) {
//     event.preventDefault();
  
//     // Obtener valores del formulario
//     const nombreUsuario = document.getElementById("txtUser").value;
//     const contraseña = document.getElementById("txtPassword").value;
  
//     // Crear objeto JSON con los datos del usuario
//     const datosUsuario = {
//       nombreUsuario,
//       contraseña,
//     };
  
//     // Opciones para la solicitud fetch
//     const opciones = {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify(datosUsuario),
//     };
  
//     // Enviar solicitud a la API
//     fetch("https://localhost:7230/api/Bibliotecario/InicioDeSesion", opciones)
//       .then((respuesta) => {
//         if (respuesta.ok) {
//           return respuesta.json();
//         } else {
//           throw new Error("Error al iniciar sesión: " + respuesta.statusText);
//         }
//       })
//       .then((respuestaJSON) => {
//         if (respuestaJSON.success) {
//           // Almacenar información del usuario en la sesión
//           localStorage.setItem("usuario", JSON.stringify(respuestaJSON.data));
  
//           // Redirigir al usuario a la página principal
//           window.location.href = "/Pages/plantillas/signin.html";
//         } else {
//           // Mostrar mensaje de error
//           const mensajeError = document.getElementById("mensajeError");
//           mensajeError.innerHTML = respuestaJSON.message;
//           mensajeError.style.display = "block";
//         }
//       })
//       .catch((error) => {
//         console.error(error);
//         // Mostrar mensaje de error general
//         const mensajeError = document.getElementById("mensajeError");
//         mensajeError.innerHTML = "Error al conectar con el servidor";
//         mensajeError.style.display = "block";
//       });
//   }
  
//   // Agregar evento submit al formulario
//   document.getElementById("form-signin").addEventListener("submit", enviarSolicitud);
  


document.addEventListener('DOMContentLoaded', function() {
    document.querySelector('form').addEventListener('submit', function(e) {
        e.preventDefault();
        const formData = new FormData(e.target);
        const jsonData = JSON.stringify(Object.fromEntries(formData));
        fetch('https://localhost:7037/api/Usuario/InicioDeSesion', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: jsonData
        }).then(response => {
            if (response.ok) {
                return response.json();
            }
            throw new Error('La respuesta de la API no fue exitosa');
        }).then(data => {
            if (data.success) {
                // Redireccionar a Register.html si la autenticación es correcta
                window.location.href = '/Pages/plantillas/presentacion.html';
                console.log("Inicio de sesión exitoso");
            } else {
                console.log("Inicio de sesión fallido: " + data.message);
            }
        }).catch(error => {
            console.error('Error al enviar la solicitud:', error);
        });
    });
});
