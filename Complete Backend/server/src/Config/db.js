const mysql = require("mysql2");

const db = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USERNAME,
    password:process.env.DB_PASSWORD,
    database:process.env.DB_DATABASE,
    waitForConnections: true, //it allows multiuple connections instead of every signle connections
    connectionLimit: 10,
    queueLimit: 0
});
db.getConnection((err) => {
    console.log(err);
})
module.exports = db;