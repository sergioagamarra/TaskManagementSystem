const ProjectModel = require("../models/project")

class Project {

    async getAllProjectsForId(idUser){
        try {
            const project = await ProjectModel.find({usuario: idUser});
            return project;
        } catch (error) {
            console.log("getAllProjectsForId(): ", error);
            return error;
        }
    }

    async createProject(data){
        try {
            const project = await ProjectModel.create(data);
            return project;
        } catch (error) {
            console.log("createProject(): ", error);
            return error;
        }
    }

    async getProjectById(idProject){
        try {
            const project = await ProjectModel.findById(idProject);
            return project;
        } catch (error) {
            console.log("getProjectById(): ", error);
            return error;
        }
    }

    async updateProject(idProject, data){
        try {
            const project = await ProjectModel.findByIdAndUpdate(idProject, data, {new: true});
            return project;
        } catch (error) {
            console.log("updateProject(): ", error);
            return error;
        }
    }

    async deleteProject(idProject){
        try {
            const project = await ProjectModel.findByIdAndDelete(idProject, {new: true});
            return project;
        } catch (error) {
            console.log("deleteProject(): ", error);
            return error;
        }
    }

}

module.exports = Project