const mysql = require('mysql');
require('dotenv').config();
const db = mysql.createConnection({
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE,
    charset: process.env.CHARSET,
});

db.on('error', function (err) {
    console.log('[mysql error]', err);
});
module.exports = db;
