import { Router } from 'express';

// 1. IMPORTAMOS LAS FUNCIONES DEL CONTROLADOR
import { 
    viewHome, 
    viewAbout, 
    viewContact, 
    saveContactMessage, 
    viewAdminMessages, 
    viewLoginDocentes,
    viewLoginEstudiantes,
    access,
    viewDocenteAlumnos, 
    viewDocenteDashboard,
    viewEstudianteDashboard,
    logout,
    viewError404
} from '../controllers/mainController.js';

const router = Router();

// ===================================================
// RUTAS GET (Ver páginas)
// ===================================================

// --- Públicas ---
router.get('/', viewHome);
router.get('/about', viewAbout);
router.get('/contact', viewContact);

// --- Login (Pantallas) ---
router.get('/login/docentes', viewLoginDocentes);
router.get('/login/estudiantes', viewLoginEstudiantes);

// --- Dashboards (Paneles Privados) ---
router.get('/docentes/dashboard', viewDocenteDashboard);
router.get('/estudiantes/dashboard', viewEstudianteDashboard);

// --- Módulos Docente ---
router.get('/docentes/alumnos', viewDocenteAlumnos); 

// --- Administrativas ---
router.get('/admin/mensajes', viewAdminMessages);

// --- Logout ---
router.get('/logout', logout);


// ===================================================
// RUTAS POST (Enviar datos / Procesar formularios)
// ===================================================

// Procesar formulario de contacto
router.post('/contact', saveContactMessage);

// Procesar LOGIN (¡ESTO FALTABA!) 🚨
router.post('/access', access); 


// ===================================================
// ERROR 404 (Siempre al final)
// ===================================================
router.use(viewError404);

console.log('✅ Rutas cargadas correctamente');

export default router;