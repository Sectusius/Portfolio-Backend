const mongoose= require("mongoose");
const User = mongoose.model(
    "User",
    new mongoose.Schema({
        username:{type:String, required: true},
        email:{type:String, required: true},
        role:{type:Number, required:true},
        hash:{type:String,required:true},
        salt:{type:String,required:true},
    })
);
module.exports = User;