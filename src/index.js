import express from 'express'
import { dirname, join } from 'path'
import { fileURLToPath } from 'url'
import expressLayouts from 'express-ejs-layouts';
import router from './routes/index.js'

const app = express();
const __dirname = dirname(fileURLToPath(import.meta.url))
console.log(join(__dirname, 'views'))

app.set ('views',join(__dirname,'views'))
app.set('view engine', 'ejs');

// --- AQUÍ EMPIEZA LO NUEVO ---
app.use(expressLayouts); // 2. Usar la librería
app.set('layout', 'layouts/layout'); // 3. Decirle dónde estará el archivo maestro
// --- AQUÍ TERMINA LO NUEVO ---

app.use(express.static(join(__dirname,'public')))

app.use(router)
//app.get('/', (req, res) => res.render('index'))



app.listen(3000)
console.log('Server escuchado en el puerto: ' ,3000)