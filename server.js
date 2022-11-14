//Add express js
const express = require("express");
const app = express();
app.use(express.json());

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

app.use("/api/auth", require("./Auth/route"));
