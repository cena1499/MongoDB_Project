const express = require("express");
const cookieParser = require("cookie-parser");

const { adminAuth, userAuth } = require("./Controller/auth.js");
const app = express();

app.set("view engine", "ejs");

app.use(express.json());
app.use(cookieParser());

//DB connect
const connectDB = require("./db");
connectDB();

//Setting port and start server
const PORT = 5000;
const server = app.listen(PORT, () =>
  console.log(`Server Connected to port ${PORT}`)
);
// Handling Error
process.on("unhandledRejection", (err) => {
  console.log(`An error occurred: ${err.message}`);
  server.close(() => process.exit(1));
});

app.use("/api/auth", require("./Controller/route"));
app.get("/admin", adminAuth, (req, res) => res.render("admin/dashboard"));

app.get("/admin/users", adminAuth, (req, res) =>
  res.render("admin/user/index")
);

app.get("/user", userAuth, (req, res) => res.render("user/home"));

//Render Views
app.get("/", (req, res) => res.render("home"));
app.get("/register", (req, res) => res.render("register"));
app.get("/login", (req, res) => res.render("login"));

app.get("/logout", (req, res) => {
  res.cookie("jwt", "", { maxAge: "1" });
  res.redirect("/");
});
