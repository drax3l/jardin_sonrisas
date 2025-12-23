import 'dotenv/config'
import express from 'express'
import { dirname, join } from 'path'
import { fileURLToPath } from 'url'
import expressLayouts from 'express-ejs-layouts';
import router from './routes/index.js'

const app = express();
const __dirname = dirname(fileURLToPath(import.meta.url))

// 1. Configuraciones de Vistas
app.set('views', join(__dirname, 'views'))
app.set('view engine', 'ejs');

// 2. Configuraciones de Layout (Plantilla maestra)
app.use(expressLayouts); 
app.set('layout', 'layouts/layout'); 

// 3. MIDDLEWARE (¡Esto es lo que faltaba!)
// Habilita recibir datos de formularios HTML
app.use(express.urlencoded({ extended: false })); 
app.use(express.json()); 

// 4. Archivos Estáticos (CSS, JS, Imágenes)
app.use(express.static(join(__dirname, 'public')))

// 5. Rutas
app.use(router)

// 6. Arrancar Servidor
app.listen(3000)
console.log('Server escuchado en el puerto: ', 3000)