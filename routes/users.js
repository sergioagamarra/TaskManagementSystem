const express = require("express");
const UsersService = require("../services/users");

function users(app){
    const router = express.Router();

    app.use("/api/users", router);
    const usersServ = new UsersService();

}

module.exports = users;