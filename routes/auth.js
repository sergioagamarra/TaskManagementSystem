const express = require("express");
const {authResponse, providerResponse, deleteCookie } = require("../helpers/authResponse")
const passport = require("passport");
const validateToken = require("../middleware/auth");
const AuthService = require("../services/auth");

function auth(app){
    const router = express.Router();
    app.use("/api/auth", router);

    const authServ = new AuthService();

    router.post("/login", async (req, res) => {
        const result = await authServ.login(req.body);
        //console.log(result);
        return authResponse(res, result, 401);
    })

    router.post("/signup", async (req, res) => {
        const result = await authServ.signup(req.body);
        return authResponse(res, result, 400);
    })

    router.get("/logout", (req, res) => {
        return deleteCookie(res);
    })

    router.get("/google", passport.authenticate("google", {
        scope: ["email", "profile"]
    }))

    router.get("/google/callback", passport.authenticate("google", {session: false}), async (req, res) => {
        const user = req.user.profile;
        const result = await authServ.socialLogin(user);
        console.log(result);
        return providerResponse(res, result, 401);
    })

    router.get("/facebook", passport.authenticate("facebook", {
        scope: ["email"]
    }))

    router.get("/facebook/callback", passport.authenticate("facebook", {session: false}), async (req, res) => {
        const user = req.user.profile;
        const result = await authServ.socialLogin(user);
        return providerResponse(res, result, 401);
    })

    router.get("/github", passport.authenticate("github", {
        scope: ["user:email"]
    }))

    router.get("/github/callback", passport.authenticate("github", {session: false}), async (req, res) => {
        const user = req.user.profile;
        const result = await authServ.socialLogin(user);
        return providerResponse(res, result, 401);
    })

}

module.exports = auth