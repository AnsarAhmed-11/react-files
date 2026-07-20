require("dotenv").config()

const express = require("express");
const db = require("./database");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");

const app = express();

app.use(express.json());
app.use(cookieParser());

app.use(cors({
  origin: "http://localhost:5173", // React app URL
  credentials: true,
}));

app.get("/", (req, res) => {
  res.send("hello from server");
  console.log("hello");
});

app.post("/register", (req, res) => {
  const { name, email, password } = req.body;

  const findData = "SELECT * FROM reactData WHERE email = ?"
  const sql = "INSERT INTO reactData (name, email, password) VALUES (?, ?, ?)";

  db.query(findData, [email], (err, result) => {
    if (err) {
      return res.status(500).json({
        message: "database error",
      })
    }
    if (result.length > 0) {
      return res.status(409).json({
        message: "email already exists",
      })
    }
    db.query(sql, [name, email, password], (err, result) => {
      if (err) {
        console.log(err);
        return res.status(500).json({
          message: "Database error in registering..",
          error: err,
        });
      }

      const token = jwt.sign(
        {
          id: result.insertId,
          email
        },
        process.env.JWT_SECRET,
        {
          expiresIn: "1d",
        }
      );

      res.cookie("token", token, {
        httpOnly: true,
        maxAge: 24 * 60 * 60 * 1000,
      });
      res.json({
        message: "Registered",
      });

    });
  })

});

app.get("/users-data", (req, res) => {
  db.query("SELECT * FROM reactData", (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(results);
  });
});

app.post("/delete", (req, res) => {
  const { email, password } = req.body
  //query Fetch and Delete
  const findData = "SELECT * FROM reactData WHERE email = ? AND password=?"
  const sqlD = "DELETE FROM reactData WHERE email = ? AND password=?"

  db.query(findData, [email, password], (err, result) => {
    if (err) {
      res.status(500).json({
        message: "something went wrong..."
      })
    }
    if (result.length === 0) {
      return res.status(404).json({
        message: "User not found"
      });
    }
    db.query(sqlD, [email, password], (err, deleteResult) => {
      if (err) {
        return res.status(500).send(err);
      }
      res.status(200).json({
        message: "data deleted ✅"
      })
    });

  })
})

app.post("/update", (req, res) => {
  const { email, password } = req.body
  const findData = "SELECT * FROM reactData WHERE email = ? AND password=?"

  db.query(findData, [email, password], (err, result) => {
    if (err) {
      return res.status(500).json({
        success:false,
        message: "backend error"
      })
    }
    if (result.length === 0) {
      return res.status(404).json({
        success:false,
        message: "User not found"
      });
    }

    res.json({
      success:true,
      message:"user found",

    })
  })
})

app.listen(5000, () => {
  console.log("Server running on port 5000");
});