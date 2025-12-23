// src/public/js/docentes/login.js

document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.querySelector('.login-form');
    
    if (loginForm) {
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault(); // Evita que la página se recargue

            // 1. Capturar datos
            const inputs = loginForm.querySelectorAll('input');
            const usuario = inputs[0].value;
            const password = inputs[1].value;
            const btnSubmit = loginForm.querySelector('button');

            // 2. Validación simple
            if (!usuario || !password) {
                mostrarAlerta('Error', 'Por favor ingrese sus credenciales.', 'error');
                return;
            }

            // 3. Simular proceso de carga (Feedback visual)
            const textoOriginal = btnSubmit.innerText;
            btnSubmit.innerText = 'Verificando...';
            btnSubmit.disabled = true;
            btnSubmit.style.opacity = '0.7';

            // 4. Simulación de petición al servidor (2 segundos)
            setTimeout(() => {
                // Restaurar botón
                btnSubmit.innerText = textoOriginal;
                btnSubmit.disabled = false;
                btnSubmit.style.opacity = '1';

                // AQUÍ IRÍA LA LÓGICA REAL DE LOGIN (fetch)
                // Por ahora, mostramos que es una demo
                mostrarAlerta(
                    '¡Bienvenido, Colega!', 
                    'El sistema de gestión docente estará listo pronto. Usuario: ' + usuario, 
                    'info'
                );
                
            }, 1500);
        });
    }
});

// Función auxiliar para usar SweetAlert2 si existe, o alert normal
function mostrarAlerta(titulo, mensaje, icono) {
    if (typeof Swal !== 'undefined') {
        Swal.fire({
            title: titulo,
            text: mensaje,
            icon: icono,
            confirmButtonColor: '#3f51b5' // Azul Docente
        });
    } else {
        alert(`${titulo}: ${mensaje}`);
    }
}