// Esperamos a que el documento cargue para evitar errores
document.addEventListener('DOMContentLoaded', () => {
    
    const hamburger = document.getElementById('hamburger-btn');
    const navLinks = document.getElementById('nav-links');

    // Verificamos que los elementos existan antes de agregar el evento
    if (hamburger && navLinks) {
        hamburger.addEventListener('click', () => {
            // Alternar la clase 'active' para abrir/cerrar menú
            navLinks.classList.toggle('active');
            hamburger.classList.toggle('active');
        });
    }
});