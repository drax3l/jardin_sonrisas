// src/database/connection.js
import sql from 'mssql';
import dotenv from 'dotenv'; // Asegúrate de tener esto también

dotenv.config();

export const dbSettings = {
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    server: process.env.DB_SERVER,
    database: process.env.DB_DATABASE,
    options: {
        encrypt: false,
        trustServerCertificate: true
    }
};

// --- AQUÍ ESTABA EL POSIBLE ERROR ---
// Asegúrate de que diga "export async function" y NO solo "async function"
export async function getConnection() { 
    try {
        const pool = await sql.connect(dbSettings);
        return pool;
    } catch (error) {
        console.error(error);
    }
}

export { sql };