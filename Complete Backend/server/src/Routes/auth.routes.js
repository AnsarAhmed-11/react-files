const express = require("express")
const Router = express.Router()
const app = require("../app")

const { dummy, register, data, remove,update,updateData } = require("../Controlllers/auth.controller")
Router.post("/dummy", dummy)

Router.post("/register", register)
Router.get("/users-data", data)
Router.post("/delete", remove)
Router.post("/update",update)
Router.post("update",updateData)

module.exports = Router