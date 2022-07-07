const mysql = require("mysql");
require("dotenv").config();
var con = mysql.createConnection({
  host: process.env.DATABASE_HOST,
  user: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE,
  charset: process.env.CHARSET,
});
module.exports = con;
