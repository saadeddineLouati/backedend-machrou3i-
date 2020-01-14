var mongoose=require("mongoose");

var tasksgroupSchema=new mongoose.Schema({
    title:String,
    description:String,
    status: String,
    priority: String,
    owner:{type:mongoose.Schema.Types.ObjectId, ref: "User"},
    project:{type:mongoose.Schema.Types.ObjectId, ref: "Project"},
    deadline: {type: Date, default: Date.now},
    createdAt: {type: Date, default: Date.now}
});

module.exports=mongoose.model("Tasksgroup", tasksgroupSchema);