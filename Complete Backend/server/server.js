require("dotenv").config();

const app = require("./src/app");

app.listen(process.env.DB_PORT, () => {
  console.log("Server running on port 5000");
});