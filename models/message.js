
var mongoose=require("mongoose");
var searchable = require('mongoose-regex-search');

var messageSchema=new mongoose.Schema({
    message:String,
    seen: {type: Boolean, default: false},
    sender:{type:mongoose.Schema.Types.ObjectId, ref: "User"},
    reciever:{type:mongoose.Schema.Types.ObjectId, ref: "User"},
    createdAt: {type: Date, default: Date.now}
});

messageSchema.plugin(searchable);
module.exports=mongoose.model("Message", messageSchema);