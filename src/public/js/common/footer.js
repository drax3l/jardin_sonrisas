/**
 * Lógica específica del Footer
 * Se encarga de:
 * 1. Actualizar el año automáticamente.
 * 2. Manejar el botón flotante de "Volver arriba".
 */

document.addEventListener('DOMContentLoaded', () => {
    
    // --- 1. AÑO ACTUAL AUTOMÁTICO ---
    const yearSpan = document.getElementById('year');
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }

    // --- 2. BOTÓN "VOLVER ARRIBA" (SCROLL TOP) ---
    const scrollTopBtn = document.getElementById('scrollTopBtn');

    if (scrollTopBtn) {
        // A. Detectar el Scroll para mostrar/ocultar botón
        window.addEventListener('scroll', () => {
            // Si bajamos más de 300px, agregamos la clase 'show'
            if (window.scrollY > 300) {
                scrollTopBtn.classList.add('show');
            } else {
                scrollTopBtn.classList.remove('show');
            }
        });

        // B. Al hacer clic, subir suavemente
        scrollTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth' // El efecto de deslizamiento suave
            });
        });
    }
});