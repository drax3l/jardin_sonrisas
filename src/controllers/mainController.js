// src/controllers/mainController.js

// 1. IMPORTANTE: Traemos la conexión a la base de datos
import { getConnection, sql } from '../database/connection.js';

// ---------------------------------------------------
// VISTAS PÚBLICAS (GET)
// ---------------------------------------------------

export const viewHome = (req, res) => {
    res.render('index', { 
        title: 'Inicio - Cuna Jardín Sonrisas', 
        style: 'home/index.css', 
        script: 'home/index.js',
        pagina: 'inicio' 
    });
};

export const viewAbout = (req, res) => {
    res.render('about', { 
        title: 'Nosotros', 
        style: 'about/about.css', 
        script: 'about/about.js',
        pagina: 'nosotros'
    });
};

export const viewContact = (req, res) => {
    res.render('contact', { 
        title: 'Contáctanos', 
        style: 'contact/contact.css', 
        script: 'contact/contact.js',
        pagina: 'contacto'
    });
};

// ---------------------------------------------------
// LÓGICA DE GUARDADO (POST) - API para SweetAlert
// ---------------------------------------------------

export const saveContactMessage = async (req, res) => {
    const { nombre, email, telefono, mensaje } = req.body;

    // VALIDACIÓN: Todos los campos son obligatorios (incluido teléfono)
    if (!nombre || !email || !mensaje || !telefono) {
        return res.status(400).json({ 
            success: false, 
            message: "Por favor completa todos los campos obligatorios." 
        });
    }

    try {
        const pool = await getConnection();

        await pool.request()
            .input("Nombre", sql.NVarChar, nombre)
            .input("Email", sql.VarChar, email)
            .input("Telefono", sql.VarChar, telefono)
            .input("Mensaje", sql.NVarChar, mensaje)
            .execute("sp_RegistrarMensajeWeb");

        console.log("✅ Mensaje guardado en SQL Server");
        
        // Respuesta Éxito
        res.status(200).json({ 
            success: true, 
            message: "¡Gracias! Hemos recibido tu mensaje correctamente." 
        });
        
    } catch (error) {
        console.error("❌ Error en SQL:", error);
        
        // Respuesta Error Servidor
        res.status(500).json({ 
            success: false, 
            message: "Error interno al guardar el mensaje." 
        });
    }
};

// ---------------------------------------------------
// NUEVA FUNCIÓN: PANEL DE ADMINISTRACIÓN (Leer Vista)
// ---------------------------------------------------
export const viewAdminMessages = async (req, res) => {
    try {
        const pool = await getConnection();

        // Consultamos la VISTA (V_MensajesWeb)
        // Ordenamos por IdContacto DESC (el más reciente primero)
        const result = await pool.request()
            .query("SELECT * FROM V_MensajesWeb ORDER BY IdContacto DESC");

        // Renderizamos la tabla bonita
        res.render('admin/messages', { 
            title: 'Bandeja de Entrada', 
            
            // ¡AQUÍ ESTÁ EL CAMBIO!
            // Cargamos los estilos y scripts específicos del admin
            style: 'admin/messages.css', 
            script: 'admin/messages.js',
            
            mensajes: result.recordset, // Pasamos los datos a la vista
            pagina: 'admin'
        });

    } catch (error) {
        console.error("❌ Error al leer mensajes:", error);
        // En caso de error, mostramos la página 404
        res.status(500).render('404', { title: 'Error', style:'', script:'' });
    }
};

/// ---------------------------------------------------
// PORTAL DOCENTES (ERP Académico)
// ---------------------------------------------------
export const viewLoginDocentes = (req, res) => {
    res.render('docentes/login', { 
        title: 'Acceso Docente - Intranet', 
        style: 'docentes/login.css',  // Estilos exclusivos para profes (más serio)
        script: 'docentes/login.js',  // Lógica de validación docente
        pagina: 'docentes'            // Para marcar activo el botón en el menú
    });
};

// ---------------------------------------------------
// AULA VIRTUAL ESTUDIANTES (Notas, Pagos, Cursos)
// ---------------------------------------------------
export const viewLoginEstudiantes = (req, res) => {
    res.render('estudiantes/login', { 
        title: 'Aula Virtual - Estudiantes', 
        style: 'estudiantes/login.css', // Estilos más coloridos/amigables
        script: 'estudiantes/login.js', 
        pagina: 'estudiantes'
    });
};

// ---------------------------------------------------
// ERROR 404
// ---------------------------------------------------
export const viewError404 = (req, res) => {
    res.status(404).render('404', { 
        title: 'Página no encontrada',
        style: '', 
        script: '' 
    });
};