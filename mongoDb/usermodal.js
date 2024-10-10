const { name } = require('ejs');
const mongoose=require('mongoose');

mongoose.connect(`mongodb://localhost/mongodbpractice`);
const userSchema=mongoose.Schema({
    name:String,
    username:String,
    email:String
})
module.exports=mongoose.model("user",userSchema);