const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const authRoutes = require("./SQLite/routes/auth");
const issueRoutes = require("./SQLite/routes/issues");

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use("/uploads", express.static("uploads")); 

app.use("/auth", authRoutes);
app.use("/issues", issueRoutes);

app.get("/", (req, res) => {
  res.send("API CivicVote 🚀");
});

app.listen(3000, () => console.log("✅ Server pornit pe http://localhost:3000"));