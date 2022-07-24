var mongoose=require("mongoose");

const Text = mongoose.model(
    'Text',
    new mongoose.Schema({
        textBody: {type:String, required:true},
        textLocation:{type:String, required:true},
    })
)

module.exports = Text;