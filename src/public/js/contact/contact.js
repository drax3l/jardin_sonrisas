// public/js/contact/contact.js

document.addEventListener('DOMContentLoaded', () => {
    
    // NOTA: Las animaciones (.fade-in) ya las maneja main.js automáticamente.

    /* ==============================================
       ENVÍO REAL DEL FORMULARIO (Conectado a SQL)
       ============================================== */
    const form = document.getElementById('contactForm');
    
    if (form) {
        // Hacemos la función 'async' para poder esperar la respuesta del servidor
        form.addEventListener('submit', async (e) => {
            e.preventDefault(); // Evita que la página se recargue

            const btn = form.querySelector('button');
            const originalText = btn.innerText;

            // 1. Estado de "Cargando" (Mantenemos tu lógica visual)
            btn.innerText = 'Enviando...';
            btn.style.backgroundColor = '#999';
            btn.disabled = true; // Evitar doble clic

            // Recolectamos los datos reales del formulario
            const formData = new FormData(form);
            const data = Object.fromEntries(formData.entries());

            try {
                // 2. PETICIÓN REAL AL SERVIDOR (Reemplaza al setTimeout)
                const response = await fetch('/contact', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(data)
                });

                const result = await response.json();

                // 3. Analizamos qué nos respondió el servidor
                if (result.success) {
                    // --- ÉXITO ---
                    
                    // A) Alerta Bonita (SweetAlert)
                    Swal.fire({
                        title: '¡Recibido!',
                        text: result.message, // "Gracias! Hemos recibido tu mensaje..."
                        icon: 'success',
                        confirmButtonColor: '#FF9F1C', // Tu color naranja corporativo
                        confirmButtonText: 'Genial'
                    });

                    // B) Limpiar formulario
                    form.reset(); 

                    // C) Feedback visual en el botón (Tu lógica original)
                    btn.innerText = 'Mensaje Enviado ✅';
                    btn.style.backgroundColor = 'var(--secondary)'; // Verde éxito

                } else {
                    // --- ERROR DE VALIDACIÓN (Ej: faltan datos) ---
                    throw new Error(result.message);
                }

            } catch (error) {
                // --- ERROR DE CONEXIÓN O SERVIDOR ---
                console.error('Error:', error);
                
                Swal.fire({
                    title: 'Ups...',
                    text: error.message || 'No pudimos conectar con el servidor.',
                    icon: 'error',
                    confirmButtonText: 'Entendido'
                });

                // Feedback visual de error en el botón (Agregado para mejorar UX)
                btn.innerText = 'Error al enviar ❌';
                btn.style.backgroundColor = '#d9534f'; // Rojo error
            } finally {
                // 4. Volver a la normalidad después de 3 segundos (Tu lógica original)
                // El 'finally' asegura que esto pase SIEMPRE, haya éxito o error.
                setTimeout(() => {
                    btn.innerText = originalText;
                    btn.style.backgroundColor = ''; // Vuelve al color original
                    btn.disabled = false;
                }, 3000);
            }
        });
    }
    
    console.log('📞 Contact JS cargado: Modo Producción');
});