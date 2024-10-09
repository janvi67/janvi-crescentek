const express = require("express");
const app = express();

app.get("/", function (req, res) {
  res.send("Hello World");
});
app.use(function (req, res, next) {
  res.send("profile page");
  
  return next(new Error("something went wrong"));
});
app.get("/profile", function (req, res) {
  res.send("profile page");
});
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});

app.listen(3000);
