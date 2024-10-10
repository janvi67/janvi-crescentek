const express = require("express");
const app = express();
const userModel = require("./usermodal");


app.get("/", (req, res) => {
  res.send("hey");
});

app.get("/create",async (req, res) => {
 let createduser=await  userModel.create({
    name: "janvi",
    email: "janvi@gmai.com",
    username: "janvi"
  });
 res.send(createduser)
});



app.get('/update',async (req,res)=>{

    let updateduser=await userModel.findOneAndUpdate({username:"janvi"},{name:"harsh"},{new:true})
    res.send(updateduser)

})

app.get('/read',async (req,res)=>{

    let users=await userModel.find()
    res.send(users)

})
app.get('/delete',async (req,res)=>{

    let users=await userModel.findOneAndDelete({username:"janvi"})
    res.send(users)

})


app.listen(3001);
