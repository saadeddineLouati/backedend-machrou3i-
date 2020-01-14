var mongoose=require("mongoose");

var taskSchema=new mongoose.Schema({
    title:String,
    kind:String,
    description:String,
    status: String,
    priority: String,
    deadline: {type: Date, default: Date.now},
    owner:{type:mongoose.Schema.Types.ObjectId, ref: "User"},
    taskgroup:{type:mongoose.Schema.Types.ObjectId, ref: "Taskgroup"},
    createdAt: {type: Date, default: Date.now}
});

module.exports=mongoose.model("Task", taskSchema);