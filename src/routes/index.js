import { Router } from 'express';

const router = Router();

// Rutas normales
router.get('/', (req, res) => res.render('index', { title: 'Inicio - Cuna Jardín', style: 'home/index.css', script: 'home/index.js' }));
router.get('/about', (req, res) => res.render('about', { title: 'Nosotros', style: 'about/about.css', script: 'about/about.js' }));
router.get('/contact', (req, res) => res.render('contact', { title: 'Contacto', style: 'contact/contact.css', script: 'contact/contact.js' }));

// RUTA ERROR 404 (Siempre al final)
router.use((req, res) => {
    res.status(404).render('404', { 
        title: 'Página no encontrada',
        style: '',   // String vacío para que no falle el layout
        script: ''   // String vacío
    });
});

export default router;