const express = require("express");
const TasksService = require("../services/tasks");
const { json } = require("express");
const authValidation = require("../middleware/auth");

function tasks(app){
    const router = express.Router();
    app.use("/api/tasks", router);
    const tasksServ = new TasksService();

    router.get("/:idProject", authValidation(), async (req, res) => {
        const result = await tasksServ.getAllTasksForId(req.params.idProject);
        return res.json(result);
    });

    router.get("/:idTask", authValidation(), async (req, res) => {
        const result = await tasksServ.getTaskById(req.params.idTask);
        return res.json(result);
    });

    router.post("/", authValidation(), async (req, res) => {
        const result = await tasksServ.createTask(req.body);
        return res.json(result);
    });

    router.update("/:idTask", authValidation(), async (req, res) => {
        const result = await tasksServ.updateTask(req.params.idTask);
        return res.json(result);
    });

    router.delete("/:idTask", authValidation(), async (req, res) => {
        const result = await tasksServ.deleteTask(req.params.idTask);
        return res.json(result);
    })

}

module.exports = tasks;