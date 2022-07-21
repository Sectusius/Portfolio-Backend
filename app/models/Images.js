var mongoose=require("mongoose");

const Images = mongoose.model(
    'Images',
    new mongoose.Schema({
        imageUrl: {type:String, required:true},
        imageDesc:{type:String, required:true},
    })
)

module.exports =Images;