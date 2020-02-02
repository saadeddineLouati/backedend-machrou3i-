var mongoose=require("mongoose");

var taskSchema=new mongoose.Schema({
    title:String,
    progress:{type: Number, default: 0.1},
    description:String,
    status: String,
    priority: String,
    deadline: {type: Date, default: Date.now},
    owner:{type:mongoose.Schema.Types.ObjectId, ref: "User"},
    taskgroup:{type:mongoose.Schema.Types.ObjectId, ref: "Tasksgroup"},
    createdAt: {type: Date, default: Date.now}
});

module.exports=mongoose.model("Task", taskSchema);