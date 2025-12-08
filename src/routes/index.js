import {Router} from 'express';

const router = Router()
router.get ('/', (req,res)=> res.render('index', {title: 'inicio pagina web'}))
router.get ('/about', (req,res)=> res.render('about', {title: 'about pagina web'}))
router.get ('/contact', (req,res)=> res.render('contact', {title: 'contact pagina web'}))

export default router