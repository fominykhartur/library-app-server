const mysql = require('mysql2');

// const config = {
//     host: 'localhost',
//     user: 'root',
//     password: 'root',
//     database: 'library-db',
// };
require('dotenv').config();

const config = {
    host: process.env.host,
    user: process.env.user,
    password: process.env.password,
    database: process.env.database,
}

const pool = mysql.createPool(config);

module.exports = pool;