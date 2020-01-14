var mongoose=require("mongoose");

var teamSchema=new mongoose.Schema({
    title:String,
    description:String,
    status: String,
    owner:{type:mongoose.Schema.Types.ObjectId, ref: "User"},
    members: [{type:mongoose.Schema.Types.ObjectId, ref: "User"}],
    createdAt: {type: Date, default: Date.now}
});

module.exports=mongoose.model("Team", teamSchema);