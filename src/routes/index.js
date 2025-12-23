// src/routes/main.routes.js (o como se llame tu archivo)
import { Router } from 'express';

// 1. AGREGAMOS 'viewAdminMessages' A LA LISTA DE IMPORTS
import { 
viewHome, 
    viewAbout, 
    viewContact, 
    saveContactMessage, 
    viewAdminMessages, 
    viewLoginDocentes,
    viewLoginEstudiantes,
    viewError404
} from '../controllers/mainController.js';

const router = Router();

// --- Rutas Públicas ---
router.get('/', viewHome);
router.get('/about', viewAbout);
router.get('/contact', viewContact);

// 2. Rutas de Login (¡VERIFICA QUE ESTÉN AQUÍ!)
router.get('/login/docentes', viewLoginDocentes);
router.get('/login/estudiantes', viewLoginEstudiantes);

// 3. Ruta Admin
router.get('/admin/mensajes', viewAdminMessages);

// 4. Guardar datos
router.post('/contact', saveContactMessage);

// --- Rutas Administrativas (NUEVO) ---
// La ponemos aquí, antes del 404.
router.get('/admin/mensajes', viewAdminMessages);

// --- Ruta POST (Guardar datos) ---
router.post('/contact', saveContactMessage);

// --- RUTA ERROR 404 (Siempre debe ser la última línea de rutas) ---
router.use(viewError404);

console.log('Rutas cargadas correctamente');

export default router;