const express = require("express");
const overviewRouter = require('./routers/overviewRouter')
const cookieSession = require('cookie-session')
const cors = require('cors')
const passport = require('passport')
const passportSetup = require("./passport")
const auth = require("./routers/auth")
const session = require('express-session')



const app = express();

//Middlewares
app.use(express.json())
app.use(cookieSession({
    name : 'a',
    keys: ['spotify-insights'],
    maxAge : 24*60*60*60
}))
app.use(
    session({secret: 'spotify-insights', 
    resave: true, 
    saveUninitialized: true})
  );


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