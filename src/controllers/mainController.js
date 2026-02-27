// src/controllers/mainController.js

import { getConnection, sql } from '../database/connection.js';

// ===================================================
// SECCIÓN 1: VISTAS PÚBLICAS (SIN CAMBIOS) ✅
// ===================================================

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

// ===================================================
// SECCIÓN 2: LÓGICA DE DATOS API (SIN CAMBIOS) ✅
// ===================================================

export const saveContactMessage = async (req, res) => {
    const { nombre, email, telefono, mensaje } = req.body;

    if (!nombre || !email || !mensaje || !telefono) {
        return res.status(400).json({ success: false, message: "Por favor completa todos los campos obligatorios." });
    }

    try {
        const pool = await getConnection();
        await pool.request()
            .input("Nombre", sql.NVarChar, nombre)
            .input("Email", sql.VarChar, email)
            .input("Telefono", sql.VarChar, telefono)
            .input("Mensaje", sql.NVarChar, mensaje)
            .execute("sp_RegistrarMensajeWeb");

        res.status(200).json({ success: true, message: "¡Gracias! Hemos recibido tu mensaje correctamente." });
    } catch (error) {
        console.error("❌ Error en SQL:", error);
        res.status(500).json({ success: false, message: "Error interno al guardar el mensaje." });
    }
};

// ===================================================
// SECCIÓN 3: PANELES ADMINISTRATIVOS (SIN CAMBIOS) ✅
// ===================================================

export const viewAdminMessages = async (req, res) => {
    try {
        const pool = await getConnection();
        const result = await pool.request().query("SELECT * FROM V_MensajesWeb ORDER BY IdContacto DESC");

        res.render('admin/messages', { 
            title: 'Bandeja de Entrada', 
            style: 'admin/messages.css', 
            script: 'admin/messages.js',
            mensajes: result.recordset,
            pagina: 'admin'
        });
    } catch (error) {
        console.error("❌ Error al leer mensajes:", error);
        res.status(500).render('404', { title: 'Error', style:'', script:'' });
    }
};

// ===================================================
// SECCIÓN 4: LOGIN Y ACCESO (AUTH) ✅
// ===================================================

export const viewLoginDocentes = (req, res) => {
    if (req.session.user && req.session.user.rol === 2) {
        return res.redirect('/docentes/dashboard');
    }
    res.render('docentes/login', { 
        title: 'Acceso Docente - Intranet', 
        style: 'docentes/login.css', 
        script: 'docentes/login.js', 
        pagina: 'docentes' 
    });
};

export const viewLoginEstudiantes = (req, res) => {
    if (req.session.user && req.session.user.rol === 3) {
        return res.redirect('/estudiantes/dashboard');
    }
    res.render('estudiantes/login', { 
        title: 'Aula Virtual - Estudiantes', 
        style: 'estudiantes/login.css', 
        script: 'estudiantes/login.js', 
        pagina: 'estudiantes'
    });
};

export const access = async (req, res) => {
    const { email, password, tipo } = req.body; 

    try {
        const pool = await getConnection();
        const result = await pool.request()
            .input("Email", sql.VarChar, email)
            .input("Password", sql.VarChar, password)
            .execute("sp_ValidarAcceso");

        const data = result.recordset[0]; 

        if (data && data.Estado === 'Exito') {
            req.session.user = {
                loggedIn: true,
                idUsuario: data.IdUsuario,
                nombre: data.Nombre,
                rol: data.IdRol,         
                idEntidad: data.IdEntidad
            };

            if (data.IdRol === 2) return res.redirect('/docentes/dashboard');
            if (data.IdRol === 3) return res.redirect('/estudiantes/dashboard');
            return res.redirect('/'); 
        } else {
            const carpeta = tipo === 'docente' ? 'docentes' : 'estudiantes';
            return res.render(`${carpeta}/login`, {
                title: 'Acceso Denegado',
                style: `${carpeta}/login.css`,
                script: `${carpeta}/login.js`,
                pagina: carpeta,
                error: 'El correo o la contraseña son incorrectos.' 
            });
        }
    } catch (error) {
        console.error("❌ Error en Login:", error);
        res.status(500).send("Error del servidor.");
    }
};

// ===================================================
// SECCIÓN 5: DASHBOARDS (PANELES PRINCIPALES) ✅
// ===================================================

export const viewDocenteDashboard = (req, res) => {
    if (!req.session.user || req.session.user.rol !== 2) {
        return res.redirect('/login/docentes');
    }

    res.render('docentes/dashboard', {
        title: 'Intranet Docente',
        pagina: 'dashboard',
        layout: 'layouts/docente_layout',
        style: 'docentes/dashboard.css', 
        script: 'docentes/dashboard.js',
        user: {
            nombre: req.session.user.nombre,
            especialidad: 'Docente General', 
            email: 'Conectado'
        }
    });
};

export const viewEstudianteDashboard = (req, res) => {
    if (!req.session.user || req.session.user.rol !== 3) {
        return res.redirect('/login/estudiantes');
    }

    res.render('estudiantes/dashboard', {
        title: 'Mi Aula Virtual',
        pagina: 'dashboard',
        layout: 'layouts/estudiante_layout',
        style: 'estudiantes/dashboard.css', 
        script: 'estudiantes/dashboard.js',
        user: { 
            nombre: req.session.user.nombre,
            grado: 'Jardín',
            codigo: req.session.user.idEntidad
        }
    });
};

// ===================================================
// SECCIÓN 6: MÓDULOS DE GESTIÓN DOCENTE (✨ NUEVO)
// ===================================================

export const viewDocenteAlumnos = async (req, res) => {
    // 1. Verificar seguridad
    if (!req.session.user || req.session.user.rol !== 2) {
        return res.redirect('/login/docentes');
    }

    try {
        const pool = await getConnection();
        // 2. Pedir lista a SQL
        const result = await pool.request().execute("sp_ListarAlumnos");

        // 3. Renderizar vista con la tabla
        res.render('docentes/alumnos', {
            title: 'Mis Alumnos - Intranet',
            pagina: 'alumnos', // Para que el menú se ilumine
            layout: 'layouts/docente_layout',
            style: 'docentes/dashboard.css', 
            script: '', 
            user: req.session.user,
            alumnos: result.recordset // <-- Aquí va la lista de niños
        });

    } catch (error) {
        console.error("❌ Error al listar alumnos:", error);
        res.status(500).send("Error del servidor al obtener alumnos.");
    }
};

// ===================================================
// SECCIÓN 7: CIERRE DE SESIÓN (LOGOUT) ✅
// ===================================================

export const logout = (req, res) => {
    req.session.destroy(() => {
        res.redirect('/');
    });
};

// ===================================================
// SECCIÓN 8: ERROR 404 (SIN CAMBIOS) ✅
// ===================================================

export const viewError404 = (req, res) => {
    res.status(404).render('404', { title: 'Página no encontrada', style: '', script: '' });
};