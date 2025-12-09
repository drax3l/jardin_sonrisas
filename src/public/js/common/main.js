// public/js/common/main.js

document.addEventListener('DOMContentLoaded', () => {
    
    /* ==============================================
       SISTEMA GLOBAL DE ANIMACIONES (IntersectionObserver)
       ============================================== */
    
    // 1. Configuración: ¿Cuándo se activa? (15% visible)
    const observerOptions = {
        root: null,
        threshold: 0.15 
    };

    // 2. El Vigilante
    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Añade la clase que activa el CSS
                entry.target.classList.add('visible');
                // Deja de vigilar este elemento (ahorra recursos)
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // 3. Buscar elementos a animar
    // Busca TODOS los elementos con clase .fade-in en la página actual
    const hiddenElements = document.querySelectorAll('.fade-in');
    
    // 4. Si hay elementos, vigilarlos
    if (hiddenElements.length > 0) {
        hiddenElements.forEach(el => observer.observe(el));
    }

    console.log('Main JS cargado: Sistema de animaciones listo 🚀');
});