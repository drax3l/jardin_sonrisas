document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.querySelector('.login-form');
    
    if (loginForm) {
        loginForm.addEventListener('submit', (e) => {
            // ⚠️ IMPORTANTE: NO usamos e.preventDefault();
            // Dejamos que el formulario viaje naturalmente al servidor (/access)

            const btnSubmit = loginForm.querySelector('button');
            
            // Solo agregamos un efecto visual de carga para que se vea bonito
            if (btnSubmit) {
                // Guardamos el ancho original para que el botón no se achique
                const originalWidth = btnSubmit.offsetWidth;
                btnSubmit.style.width = `${originalWidth}px`;
                
                // Cambiamos el texto y mostramos un spinner simple
                btnSubmit.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Entrando...';
                btnSubmit.style.opacity = '0.8';
                btnSubmit.style.cursor = 'wait';
                
                // Nota: No deshabilitamos el botón (disabled) inmediatamente 
                // para asegurar que el formulario se envíe correctamente.
            }
        });
    }

    // Opcional: Si hay una alerta de error en el HTML (backend), la hacemos desaparecer suavemente
    const serverAlert = document.querySelector('.alert-error');
    if (serverAlert) {
        setTimeout(() => {
            serverAlert.style.transition = "opacity 0.5s ease";
            serverAlert.style.opacity = "0";
            setTimeout(() => serverAlert.remove(), 500);
        }, 4000); // Desaparece a los 4 segundos
    }
});