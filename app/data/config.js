const mysql = require('mysql2');

const config = {
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'library-db',
};

const pool = mysql.createPool(config);

module.exports = pool;