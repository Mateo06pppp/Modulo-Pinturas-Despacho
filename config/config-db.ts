import mysql from 'mysql2';
require('dotenv').config();

// Mostrar info de conexión (sin la contraseña real)
console.log('Variables de entorno cargadas:', {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD ? '[CONTRASEÑA CONFIGURADA]' : '[NO CONFIGURADA]',
  database: process.env.DB_NAME,
  port: process.env.DB_PORT || 3306,
  ssl: '[SSL ACTIVO]'
});

const db = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: Number(process.env.DB_PORT) || 3306,
  ssl: {
    rejectUnauthorized: true, // ✅ conexión segura sin el certificado .pem
  },
});

const promisePool = db.promise();

async function testConnection() {
  try {
    const [result] = await promisePool.query('SELECT 1 AS test');
    console.log('✅ Conexión a la base de datos establecida correctamente:', result);
    return true;
  } catch (error) {
    console.error('❌ Error al conectar con la base de datos:', error);
    return false;
  }
}

testConnection();
export default promisePool;