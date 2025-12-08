import express from 'express'
import { dirname, join } from 'path'
import { fileURLToPath } from 'url'
import router from './routes/index.js'

const app = express();
const __dirname = dirname(fileURLToPath(import.meta.url))
console.log(join(__dirname, 'views'))

app.set ('views',join(__dirname,'views'))
app.set('view engine', 'ejs');

app.use(router)
//app.get('/', (req, res) => res.render('index'))

app.listen(3000)
console.log('Server escuchado en el puerto: ' ,3000)