const TaskModel = require("../models/task")

class Task {

    async getAllTasksForId(idProject){
        try {
            const tasks = await TaskModel.find({project: idProject});
            return tasks;
        } catch (error) {
            console.log("getAllTasksForId(): ", error);
            return error;
        }
    }

    async createTask(data){
        try {
            const task = await TaskModel.create(data);
            return task;
        } catch (error) {
            console.log("createTask(): ", error);
            return error;
        }
    }

    async getTaskById(idTask){
        try {
            const task = await TaskModel.findById(idTask);
            return task;
        } catch (error) {
            console.log("getTaskById(): ", error);
            return error;
        }
    }

    async updateTask(idTask, data){
        try {
            const task = await TaskModel.findByIdAndUpdate(idTask, data, {new: true});
            return task;
        } catch (error) {
            console.log("updateTask(): ", error);
            return error;
        }
    }

    async deleteTask(idTask){
        try {
            const task = await TaskModel.findByIdAndDelete(idTask, {new: true});
            return task;
        } catch (error) {
            console.log("deleteTask(): ", error);
            return error;
        }
    }

}

module.exports = Task