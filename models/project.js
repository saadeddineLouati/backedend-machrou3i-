var mongoose=require("mongoose");
var searchable = require('mongoose-regex-search');

var projectSchema=new mongoose.Schema({
    title:String,
    kind:String,
    size:String,
    description:String,
    status: String,
    deadline: {type: Date, default: Date.now},
    owner:{type:mongoose.Schema.Types.ObjectId, ref: "User"},
    createdAt: {type: Date, default: Date.now}

});

projectSchema.plugin(searchable);
module.exports=mongoose.model("Project", projectSchema);