document.addEventListener('DOMContentLoaded', function () {
    document.querySelector('form').addEventListener('submit', function (e) {
        e.preventDefault();
        const formData = new FormData(e.target);
        const jsonData = JSON.stringify(Object.fromEntries(formData));
        fetch('https://localhost:7037/api/Usuario/Registro', {
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
                // Redireccionar a Login.html si el registro es exitoso
                alert("Registro exitoso");
                window.location.href = '/Pages/plantillas/Login.html';
                console.log("Registro exitoso");
            } else {
                console.log("Registro fallido: " + data.message);
            }
        }).catch(error => {
            console.error('Error al enviar la solicitud:', error);
        });
    });
});
