function cerrarSesion(){
    confirmar = window.confirm('¿Está seguro que cerrar sesión?');
    if( confirmar== true){
        window.location.href = '/Pages/plantillas/Login.html';
        localStorage.setItem('userID', '');
    }
    
}