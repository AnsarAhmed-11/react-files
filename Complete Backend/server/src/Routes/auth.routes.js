const express = require("express")
const Router = express.Router()
const app = require("../app")

const { Login, register, data, remove, update, updateData } = require("../Controlllers/auth.controller")
const verifyToken= require("../Middleware/verifyToken")

Router.post("/register", register)
Router.post("/Login",Login)
Router.get("/users-data", data)
Router.post("/delete", remove)
Router.post("/update", update)
Router.post("/updateData", updateData)

module.exports = Router