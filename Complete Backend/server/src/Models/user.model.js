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
    const [result] = await db.promise().query(sql, [name, email, password])
    return result;
}
const findByPassword = async (password) => {
    const sql = 'select * from reactData where password=?'
    const [result] = await db.promise().query(sql);
    return result;
}
const deleteUser = async (email) => {
    const sql = "delete from reactData where email=?"
    const [result] = await db.promise().query(sql, [email])
    return result;
}
const updateName = async (name, PrevEmail) => {
    const sql = "UPDATE reactData SET name = ? WHERE email=?"
    const [result] = await db.promise().query(sql, [name, PrevEmail])
    return result;
}
const updateEmail = async (email, prevEmail) => {
    const sql = "UPDATE reactData SET email = ? WHERE email=?"
    const [result] = await db.promise().query(sql, [email, prevEmail]);
    return result;
}
const updatePassword = async (password, prevEmail) => {
    const sql = "UPDATE reactData SET password = ? WHERE email=?"
    const [result] = await db.promise().query(sql, [email, prevEmail]);
    return result;
}
const updateEmailPassword = async (email, password, prevEmail) => {

    const sql = "UPDATE reactData SET email = ?, password = ? WHERE email = ?";

    const [result] = await db.promise().query(
        sql,
        [email, password, prevEmail]
    );

    return result;
};
const updateNameEmail = async (name, email, prevEmail) => {

    const sql = "UPDATE reactData SET name = ?, email = ? WHERE email = ?";

    const [result] = await db.promise().query(
        sql,
        [name, email, prevEmail]
    );

    return result;
};
const updateNamePassword = async (name, password, prevEmail) => {

    const sql = "UPDATE reactData SET name = ?, password = ? WHERE email = ?";

    const [result] = await db.promise().query(
        sql,
        [name, password, prevEmail]
    );

    return result;
};
module.exports = { findByEmail, fetchAll, createUser, findByPassword, deleteUser, updateName, updateEmail, updatePassword, updateEmailPassword, updateNameEmail, updateNamePassword }