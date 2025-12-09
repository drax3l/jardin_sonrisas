// public/js/contact/contact.js

document.addEventListener('DOMContentLoaded', () => {
    
    // NOTA: Las animaciones (.fade-in) ya las maneja main.js automáticamente.

    /* ==============================================
       SIMULACIÓN DE ENVÍO DE FORMULARIO
       ============================================== */
    const form = document.getElementById('contactForm');
    
    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault(); // Evita que la página se recargue

            const btn = form.querySelector('button');
            const originalText = btn.innerText;

            // 1. Estado de "Cargando"
            btn.innerText = 'Enviando...';
            btn.style.backgroundColor = '#999';
            btn.disabled = true; // Evitar doble clic

            // 2. Simular espera (2 segundos)
            setTimeout(() => {
                alert('¡Gracias! Hemos recibido tu mensaje correctamente.');
                
                // 3. Limpiar y confirmar
                form.reset(); 
                btn.innerText = 'Mensaje Enviado ✅';
                btn.style.backgroundColor = 'var(--secondary)'; // Verde éxito
                
                // 4. Volver a la normalidad después de 3 segundos
                setTimeout(() => {
                    btn.innerText = originalText;
                    btn.style.backgroundColor = ''; // Vuelve al color original
                    btn.disabled = false;
                }, 3000);

            }, 2000);
        });
    }
    
    console.log('📞 Contact JS cargado');
});