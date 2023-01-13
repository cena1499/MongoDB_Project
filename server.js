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
app.get("/admin/unconfirmed-users", adminAuth, (req, res) =>
  res.render("admin/user/unconfirmedUsers")
);
app.get("/admin/create-user", adminAuth, (req, res) =>
  res.render("admin/user/create")
);
app.get("/admin/detail-user/:id", adminAuth, (req, res) =>
  res.render("admin/user/detail")
);
app.get("/admin/edit-user/:id", adminAuth, (req, res) =>
  res.render("admin/user/edit")
);

app.get("/admin/history-user/:id", adminAuth, (req, res) =>
  res.render("admin/user/history")
);

app.get("/admin/create-book", adminAuth, (req, res) =>
  res.render("admin/book/create")
);
app.get("/admin/books", adminAuth, (req, res) =>
  res.render("admin/book/index")
);
app.get("/admin/detail-book/:id", adminAuth, (req, res) =>
  res.render("admin/book/detail")
);
app.get("/admin/edit-book/:id", adminAuth, (req, res) =>
  res.render("admin/book/edit")
);

app.get("/user/edit-user/:id", userAuth, (req, res) => res.render("user/edit"));

app.get("/user", userAuth, (req, res) => res.render("user/home"));
app.get("/user/books", userAuth, (req, res) => res.render("user/book/index"));
app.get("/user/detail-book/:id", userAuth, (req, res) =>
  res.render("user/book/detail")
);
app.get("/user/my-books", userAuth, (req, res) =>
  res.render("user/book/lendBook")
);
app.get("/user/my-history", userAuth, (req, res) =>
  res.render("user/book/history")
);

//Render Views
app.get("/", (req, res) => res.render("login"));
app.get("/register", (req, res) => res.render("register"));
app.get("/login", (req, res) => res.render("login"));

app.get("/logout", (req, res) => {
  res.cookie("jwt", "", { maxAge: "1" });
  res.redirect("/");
});
