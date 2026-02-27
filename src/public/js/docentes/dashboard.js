document.addEventListener('DOMContentLoaded', () => {
    console.log('👨‍🏫 Panel Docente Activo');

    // 1. Mostrar Fecha y Hora en tiempo real (Podrías agregar un <div id="reloj"> en el EJS)
    actualizarReloj();
    setInterval(actualizarReloj, 1000);

    // 2. Confirmación segura de Logout
    const btnLogout = document.querySelector('.logout a');
    if (btnLogout) {
        btnLogout.addEventListener('click', (e) => {
            e.preventDefault(); // Detener la navegación directa

            if (typeof Swal !== 'undefined') {
                Swal.fire({
                    title: '¿Cerrar Sesión?',
                    text: "Se guardarán los cambios pendientes.",
                    icon: 'warning',
                    showCancelButton: true,
                    confirmButtonColor: '#4a148c', // Morado docente
                    cancelButtonColor: '#d33',
                    confirmButtonText: 'Sí, salir',
                    cancelButtonText: 'Cancelar'
                }).then((result) => {
                    if (result.isConfirmed) {
                        window.location.href = '/logout';
                    }
                });
            } else {
                if(confirm("¿Seguro que desea salir?")) window.location.href = '/logout';
            }
        });
    }
});

function actualizarReloj() {
    // Solo si existe un elemento donde mostrarlo, o lo inyectamos en la bienvenida
    const welcomeP = document.querySelector('.welcome-text p');
    if (welcomeP) {
        const ahora = new Date();
        const opciones = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute:'2-digit' };
        // Esto agrega la fecha al texto existente sin borrarlo
        // (O puedes crear un elemento dedicado en el HTML)
        // welcomeP.setAttribute('title', ahora.toLocaleDateString('es-ES', opciones));
    }
}