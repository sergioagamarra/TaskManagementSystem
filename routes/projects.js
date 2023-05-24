const express = require("express");
const ProjectsService = require("../services/projects");
const { json } = require("express");
const authValidation = require("../middleware/auth");

function project(app){
    const router = express.Router();
    app.use("/api/project", router);
    const projectServ = new ProjectsService();

    router.get("/:idUser", authValidation(), async (req, res) => {
        const result = await projectServ.getAllProjectsForId(req.params.idUser);
        return res.json(result);
    });

    router.get("/:idProject", authValidation(), async (req, res) => {
        const result = await projectServ.getProjectById(req.params.idTask);
        return res.json(result);
    });

    router.post("/", authValidation(), async (req, res) => {
        const result = await projectServ.createProject(req.body);
        return res.json(result);
    });

    router.update("/:idProject", authValidation(), async (req, res) => {
        const result = await projectServ.updateProject(req.params.idProject);
        return res.json(result);
    });

    router.delete("/:idProject", authValidation(), async (req, res) => {
        const result = await projectServ.deleteProject(req.params.idProject);
        return res.json(result);
    })

}

module.exports = project;