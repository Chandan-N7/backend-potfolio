const { Router } = require("express");
const { addProject, getAllProject, getAllProjects, removeProject } = require("../controller/ProjectController.js");
const multer = require("multer");
const verifyToken = require("../middleware/AuthMiddleware.js");

const projectRoutes = Router();

const storage = multer.diskStorage({
    destination:"uploads",
    filename:(req, file,cb)=>{
        return cb(null, `${Date.now()}${file.originalname}`)
    }
})
const upload =multer({
    storage:storage,
})

projectRoutes.post('/add-project',verifyToken, upload.single("image"), addProject)
projectRoutes.get('/get-all-projects', getAllProjects)
projectRoutes.post('/remove-project',verifyToken, removeProject)

module.exports = projectRoutes;