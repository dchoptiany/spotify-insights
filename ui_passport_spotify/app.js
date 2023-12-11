const express = require("express");
const cookieSession = require('cookie-session')
const cors = require('cors')
const passportSetup = require("./passport")
const passport = require('passport')
const auth = require("./routers/auth")
const api = require("./routers/apiRouter")


const app = express();

//Middlewares
app.use(express.json())
app.use(cookieSession({
    name : 'session',
    keys: ['spotify-insights'],
    maxAge : 24*60*60*60
}))

app.use(passport.initialize());
app.use(passport.session());


//Routers
app.use(cors({
    origin: ["http://localhost:3000", "http://docker-gateway:8080"],
    methods: "GET,POST,PUT,DELETE",
    credentials : true
}))
app.use("/auth",auth)
app.use("/api",api)


module.exports = app
