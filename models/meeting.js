var mongoose=require("mongoose");

var meetingSchema=new mongoose.Schema({
    title:String,
    orgonizer:String,
    date: {type: Date, default: Date.now},
    members: [{type:mongoose.Schema.Types.ObjectId, ref: "User"}],
    createdAt: {type: Date, default: Date.now}
});

module.exports=mongoose.model("Meeting", meetingSchema);