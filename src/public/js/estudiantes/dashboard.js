document.addEventListener('DOMContentLoaded', () => {
    console.log('🎒 Panel de Estudiante Listo');

    // 1. Animación suave de entrada para las tarjetas
    const cards = document.querySelectorAll('.card');
    cards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'all 0.5s ease';
        
        // Retraso escalonado (efecto cascada)
        setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, index * 100); 
    });

    // 2. Simulador de botones "Ver Curso"
    const botonesVer = document.querySelectorAll('.btn-small');
    botonesVer.forEach(btn => {
        btn.addEventListener('click', (e) => {
            // Efecto visual al click
            const cursoNombre = e.target.parentElement.querySelector('h4').innerText;
            
            // Usamos SweetAlert si está disponible (asumiendo que lo cargas en el layout)
            // Si no, usamos confirm nativo
            if (typeof Swal !== 'undefined') {
                Swal.fire({
                    title: 'Abriendo curso...',
                    text: `Entrando a ${cursoNombre}`,
                    icon: 'info',
                    timer: 1500,
                    showConfirmButton: false
                });
            } else {
                alert(`Navegando a: ${cursoNombre}`);
            }
        });
    });
});