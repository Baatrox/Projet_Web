import mysql from 'mysql2/promise';

const pool = mysql.createPool({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'baatrox',
  password: process.env.DB_PASS || 'PROGEEK2m!',
  database: process.env.DB_NAME || 'master_rsi',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

export default pool;
