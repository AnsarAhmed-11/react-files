require("dotenv").config();

const app = require("./src/app");

app.listen(5000, () => {
  console.log("Server running on port 5000");
});


// const express = require("express");
// const db = require("./database");
// const cors = require("cors");
// const cookieParser = require("cookie-parser");
// const jwt = require("jsonwebtoken");
// const bcrypt = require("bcrypt");

// const app = express();

// app.use(express.json());
// app.use(cookieParser());
