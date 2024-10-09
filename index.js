const express = require("express");
const fs = require("fs");

const path = require("path");
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));
app.set("view engine", "ejs");

// app.get("/",function(req,res){
//     res.render("index")
// })
app.get("/profile/:userName/:age", function (req, res) {
  res.send(`welcome ${req.params.userName}`);
});
app.get("/", function(req, res) {
    fs.readdir("./files", function(err, files) {
        if (err) {
          return res.status(500).send("Error reading files");
        }
        res.render("index", { files: files });
      });
});
app.post("/create" , function (req, res) {
    fs.writeFile(`./files/${req.body.title.split('').join('')}.txt`,req.body.details,function(err){
        res.redirect("/")
    })

});

app.listen(3001, function () {
  console.log("indx file running");
});
