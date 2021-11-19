// const mysql = require('mysql2');
const { Pool } = require('pg')

// const config = {
//     host: 'localhost',
//     user: 'root',
//     password: 'root',
//     database: 'library-db',
// };


const config = {
    host: process.env.host,
    user: process.env.user,
    password: process.env.password,
    database: process.env.database,
    port: process.env.dbport,
    ssl: true
}

// const pool = mysql.createPool(config);
const pool = new Pool(config);

module.exports = pool;