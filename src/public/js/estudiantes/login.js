// src/public/js/estudiantes/login.js

document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.querySelector('.login-form');
    
    if (loginForm) {
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();

            // 1. Capturar datos
            const inputs = loginForm.querySelectorAll('input');
            const codigo = inputs[0].value;
            const password = inputs[1].value;
            const btnSubmit = loginForm.querySelector('button');

            // 2. Validación
            if (!codigo || !password) {
                mostrarAlerta('¡Ups!', 'Falta tu código o contraseña.', 'warning');
                return;
            }

            // 3. Efecto de carga
            const textoOriginal = btnSubmit.innerText;
            btnSubmit.innerText = '🎒 Abriendo mochila...';
            btnSubmit.disabled = true;

            // 4. Simulación de servidor
            setTimeout(() => {
                btnSubmit.innerText = textoOriginal;
                btnSubmit.disabled = false;

                mostrarAlerta(
                    '¡Hola Estudiante!', 
                    'Estamos preparando tus notas y cursos. Código recibido: ' + codigo, 
                    'success'
                );
                
                // Si fuera real, aquí haríamos: window.location.href = '/estudiantes/dashboard';
            }, 1500);
        });
    }
});

function mostrarAlerta(titulo, mensaje, icono) {
    if (typeof Swal !== 'undefined') {
        Swal.fire({
            title: titulo,
            text: mensaje,
            icon: icono,
            confirmButtonColor: '#ff9800' // Naranja Estudiante
        });
    } else {
        alert(`${titulo}\n\n${mensaje}`);
    }
}