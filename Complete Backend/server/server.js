const express = require("express");
const db = require("./database");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());


app.get("/", (req, res) => {
  res.send("hello from server");
  console.log("hello");
});

app.post("/data", (req, res) => {
  const { name, email, password } = req.body;
  const sql = "INSERT INTO reactData (name, email, password) VALUES (?, ?, ?)";
  db.query(sql, [name, email, password], (err, result) => {
    if (err) {
      console.log(err);
      return res.status(500).json({
        message: "Database error",
        error: err,
      });
    }

    res.json({
      message: "data has been received",
      data: { name, email },
      insertId: result.insertId
    });
  });
});

app.get("/users", (req, res) => {
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
      // Pending here
app.post("/update", (req, res) => {
  const { email, password } = req.body
  const findData = "SELECT * FROM reactData WHERE email = ? AND password=?"
  db.query(findData, [email, password], (err, result) => {
    if (err) {
      res.status(500).json({
        message: "data not found"
      })
    }
    if (result.length === 0) {
      return res.status(500).json({
        message: "User not found"
      });
    }

  })
})

app.listen(5000, () => {
  console.log("Server running on port 5000");
});