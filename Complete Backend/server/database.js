const mysql = require("mysql2");

const db = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "",
    database: "react", 
    waitForConnections: true, //it allows multiuple connections instead of every signle connections
    connectionLimit: 10,
    queueLimit: 0
});
db.getConnection((err) => {
    console.log(err);
})
module.exports = db;