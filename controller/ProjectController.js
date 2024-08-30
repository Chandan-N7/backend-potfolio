const fs = require("fs");
const Project = require("../model/ProjectModel.js");
const internal = require("stream");
const User = require("../model/UserModel.js");

//add projects
const addProject = async (req, res, next) => {
    try {
        const { title, skill, category,link } = req.body;
        let image_filename = `${req.file.filename}`;

        const project = await Project.create({
            title,
            skill,
            category,
            image: image_filename,
            link,
        })
        return res.status(200).json({
            project: {
                title: project.title,
                skill: project.skill,
                category: project.category,
                image: project.image,
                link: project.link,
            }
        })
    } catch (error) {
        console.log("add project", error)
        return res.status(400).send("Internal Server Error")
    }
}

//get projects
const getAllProjects = async (req, res, next) => {
    try {
        const projects = await Project.find({});
        return res.status(200).send(projects)
    } catch (error) {
        console.log("get all projects", error)
        return res.status(400).send("Internal Server Error")
    }
}

// remove project 
const removeProject = async (req, res, next) => {
    try {
        const project = await Project.findById(req.body.id);
        fs.unlink(`uploads/${project.image}`, () => { })
        await Project.findByIdAndDelete(req.body.id);
        return res.status(200).send("Project Removed")
    } catch (error) {
        console.log("get all projects", error)
        return res.status(400).send("Internal Server Error")
    }
}

module.exports = { addProject, getAllProjects, removeProject }