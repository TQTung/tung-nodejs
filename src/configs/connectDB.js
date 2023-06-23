import mysql from "mysql2/promise";

console.log("Created connection pool ...");

const pool = mysql.createPool({
  host: "localhost",
  user: "root",
  database: "tunglnodejs",
});

export default pool;
