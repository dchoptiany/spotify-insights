const express = require("express");
const overviewRouter = require('./routers/overviewRouter')
const cookieSession = require('cookie-session')
const cors = require('cors')
const passportSetup = require("./passport")
const passport = require('passport')
const auth = require("./routers/auth")



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
//app.use('/overview', overviewRouter);
app.use(cors({
    origin: "http://localhost:3000",
    methods: "GET,POST,PUT,DELETE",
    credentials : true
}))
app.use("/auth",auth)

module.exports = app