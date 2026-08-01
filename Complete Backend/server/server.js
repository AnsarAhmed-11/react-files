require("dotenv").config()

const express = require("express");
const db = require("./database");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

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

app.post("/register", async (req, res) => {
  const { name, email, password } = req.body;

  const findData = "SELECT * FROM reactData WHERE email = ?"
  const sql = "INSERT INTO reactData (name, email, password) VALUES (?, ?, ?)";
  const hashPassword = await bcrypt.hash(password, 10)

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
    db.query(sql, [name, email, hashPassword], (err, result) => {
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

app.post("/delete", async (req, res) => {
  const { email, password } = req.body
  //query Fetch and Delete
  const findData = "SELECT * FROM reactData WHERE email = ?"
  const sqlD = "DELETE FROM reactData WHERE email = ?"
  db.query(findData, [email], async (err, result) => {
    if (err) {
      res.status(500).json({
        message: "something went wrong..."
      })
    }
    if (result.length === 0) {
      return res.status(404).json({
        message: "Invalid user-email"
      });
    }
    try {
      const hashPassword = result[0].password
      const matchPassword = await bcrypt.compare(password, hashPassword);
      if (!matchPassword) {
        return res.status(401).json({
          message: "invalid password,"
        })
      }
      db.query(sqlD, [email], (err, deleteResult) => {
        if (err) {
          return res.status(500).send(err);
        }
        return res.status(200).json({
          message: "data deleted ✅"
        })
      });
    } catch (err) {
      return res.status(500).json({
        message: "server error from DB",
      })
    }
  })
})

app.post("/update", (req, res) => {
  const { email, password } = req.body
  const findData = "SELECT * FROM reactData WHERE email = ? AND password=?"

  db.query(findData, [email, password], (err, result) => {
    if (err) {
      return res.status(500).json({
        success: false,
        message: "backend error"
      })
    }
    if (result.length === 0) {
      return res.status(404).json({
        success: false,
        message: "User not found"
      });
    }
    res.json({
      success: true,
      message: "user found",
      email
    })
  })
})
//authentication pending with token
//leaved on email or password updation
app.post("/updateData", (req, res) => {
  const { name, password } = req.body
  sqlN = "UPDATE reactData SET name = ? WHERE email = ?"
  sqlP = "UPDATE reactData SET password = ? WHERE email = ?"

  if (name == "") {
    if (password == "") {
      return res.status(500).json({
        message: "somehting went wrong"
      })
    }
    else {
      db.query(sqlP, (err, result) => {
        if (err) {
          return res.status(500).json({
            message: "password realted issue"
          })
        }
        return res.json({
          message: "password updated"
        })
      })

    }
  }
  else {
    db.query(sqlN)
  }


})
app.listen(5000, () => {
  console.log("Server running on port 5000");
});