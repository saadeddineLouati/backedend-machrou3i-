
var mongoose=require("mongoose");
var searchable = require('mongoose-regex-search');

var notificationSchema=new mongoose.Schema({
    title:String,
    description:String,
    status: {type: String, default: "not seen"},
    sender:{type:mongoose.Schema.Types.ObjectId, ref: "User"},
    reciever:{type:mongoose.Schema.Types.ObjectId, ref: "User"},
    createdAt: {type: Date, default: Date.now}
});

notificationSchema.plugin(searchable);
module.exports=mongoose.model("Notification", notificationSchema);