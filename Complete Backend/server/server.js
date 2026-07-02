const express = require("express");
const db = require("./database");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("hello from server");
});

app.get("/users", (req, res) => {
  db.query("SELECT * FROM reactData", (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(results);
  });
});

app.listen(5000, () => {
  console.log("Server running on port 5000");
});