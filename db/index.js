var mysql = require('mysql');
require('dotenv').config();

var connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: 'passkeeper'
})
connection.connect(function(err) {
  if(err) {
    console.log(err.code);
    console.log(err.fatal);
  }
});

module.exports = connection;