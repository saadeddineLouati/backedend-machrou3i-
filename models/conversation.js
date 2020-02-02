var mongoose=require("mongoose");

var conversationschema=new mongoose.Schema({
    message: String,
    owner:{type:mongoose.Schema.Types.ObjectId, ref: "User"},
    reciever:[{type:mongoose.Schema.Types.ObjectId, ref: "User", default: []}],
    createdAt: {type: Date, default: Date.now}
});

module.exports=mongoose.model("Conversation", conversationschema);