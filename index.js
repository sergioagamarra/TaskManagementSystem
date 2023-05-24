const express = require("express");
const morgan = require("morgan");
const cookie = require("cookie-parser");
const {port, sessionSecret} = require("./config");
const {connection} = require("./config/db");
const passport = require("passport");
const cors = require("cors");
const session = require("express-session");


//Routes
const users = require("./routes/users");
const auth = require("./routes/auth");

const {useFacebookStrategy, useGoogleStrategy, useGitHubStrategy} = require("./middleware/authProvider");

const app = express();

connection();

//middleware

app.use(morgan("dev"));
app.use(express.json());
app.use(cookie());
app.use(cors({
    origin: ["http://localhost:3000", "http://127.0.0.1:5500"],
    credentials: true
}))
app.use(session({
    secret: sessionSecret,
    resave: false,
    saveUninitialized: false
}))

app.use(passport.initialize())

// using strategies
passport.use(useFacebookStrategy());
passport.use(useGitHubStrategy());
passport.use(useGoogleStrategy());

passport.serializeUser((user, done) => {
    done(null, user);
})
passport.deserializeUser((user, done) => {
    done(null, user);
})

// using routes
auth(app);
users(app);


app.get("/", (req, res) => {
    return res.json({
        system: "Task Management System",
        version: "1.0",
        author: "Sergio A. Gamarra"
    })
})

app.listen(port, () => {
    console.log("Listening on: http://localhost:" + port);
})