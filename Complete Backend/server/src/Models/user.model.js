const db = require("../Config/db")

const findByEmail = async (email) => {
    const sql = "select * from reactData where email=?"
    const [result] = await db.promise().query(sql, [email])
    return result;
}

const fetchAll = async () => {
    const sql = "SELECT * FROM reactData";
    const [result] = await db.promise().query(sql);
    return result;
}

const createUser = async (name, email, password) => {
    const sql = `INSERT INTO reactData (name, email, password) VALUES (?, ?, ?)`;
    const [result] = await db.promise().query(sql,[name,email,password])
    return result;
}
module.exports = { findByEmail, fetchAll, createUser }