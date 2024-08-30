const mongoose = require("mongoose")

const projectSchema = new mongoose.Schema({
    title:{type:String, required:true, },
    skill:{type:String, required:true, },
    image:{type:String, required:true, },
    category:{type:String, required:true, },
    link:{type:String, required:true, },
})
 
const Project = mongoose.model("Project", projectSchema);
module.exports = Project;