const mysql2 = require("mysql2/promise");

const mysql = mysql2.createPool({
  host: "127.0.0.1",
  user: "root",
  password: "root",
  database: "test",
  multipleStatements: true,
});

module.exports = mysql;
