document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.querySelector('.login-form');
    
    if (loginForm) {
        loginForm.addEventListener('submit', (e) => {
            // ⚠️ IMPORTANTE: BORRAMOS e.preventDefault()
            // Dejamos que el formulario viaje al servidor para que SQL valide la clave
            
            const btnSubmit = loginForm.querySelector('button');

            if (btnSubmit) {
                // 1. Guardamos el ancho para que no "baile"
                const originalWidth = btnSubmit.offsetWidth;
                btnSubmit.style.width = `${originalWidth}px`;

                // 2. Efecto visual de carga
                btnSubmit.innerHTML = '<i class="fa-solid fa-circle-notch fa-spin"></i> Verificando...';
                btnSubmit.style.opacity = '0.8';
                btnSubmit.style.cursor = 'wait';
                
                // Nota: No deshabilites el botón (disabled) inmediatamente o el formulario podría no enviarse en algunos navegadores.
            }
        });
    }

    // EXTRA: Si el servidor devuelve un error (rojo), hacemos que desaparezca solito
    const serverAlert = document.querySelector('div[style*="background-color: #f3e5f5"]'); // Busca la alerta morada
    if (serverAlert) {
        setTimeout(() => {
            serverAlert.style.transition = "opacity 0.5s ease";
            serverAlert.style.opacity = "0";
            setTimeout(() => serverAlert.remove(), 500);
        }, 4000);
    }
});