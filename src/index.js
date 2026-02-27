import 'dotenv/config'
import express from 'express'
import { dirname, join } from 'path'
import { fileURLToPath } from 'url'
import expressLayouts from 'express-ejs-layouts';
import session from 'express-session'; // <--- 1. FALTABA IMPORTAR ESTO
import router from './routes/index.js'

const app = express();
const __dirname = dirname(fileURLToPath(import.meta.url))

// 1. Configuraciones de Vistas
app.set('views', join(__dirname, 'views'))
app.set('view engine', 'ejs');

// 2. Configuraciones de Layout
app.use(expressLayouts); 
app.set('layout', 'layouts/layout'); 

// 3. MIDDLEWARE DE DATOS
app.use(express.urlencoded({ extended: false })); 
app.use(express.json()); 

// ===============================================
// 🧠 4. CONFIGURACIÓN DE SESIÓN (¡FALTABA ESTO!)
// ===============================================
// Sin esto, el login no tiene "memoria" y da error.
app.use(session({
    secret: 'secreto_jardin_sonrisas', // Clave secreta
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false } // false para que funcione en localhost
}));

// 5. Archivos Estáticos
app.use(express.static(join(__dirname, 'public')))

// ===============================================
// 🧠 6. MIDDLEWARE: VIEW HELPERS & USUARIO GLOBAL
// ===============================================
app.use((req, res, next) => {
    // Helper para marcar botones activos
    res.locals.isActive = (paginaActual, paginaBoton) => {
        return paginaActual === paginaBoton ? 'active' : '';
    };

    // FALTABA ESTO: Pasar el usuario a TODAS las vistas HTML
    // Si no pones esto, cuando entres al dashboard te dirá "user is not defined"
    res.locals.user = req.session.user || null; 

    next(); 
});

// 7. Rutas 
app.use(router)

// 8. Arrancar Servidor
app.listen(3000)
console.log('Server escuchado en el puerto: ', 3000)