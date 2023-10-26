const express = require("express");
const overviewRouter = require('./routers/overviewRouter')
const cookieSession = require('cookie-session')
const cors = require('cors')


const app = express();

//Middlewares
app.use(express.json())
app.use(cookieSession({
    name : 'session',
    keys: ['spotify-insights'],
    maxAge : 24*60*60*60
}))


//Routers
app.use('/overview', overviewRouter);
app.use(cors({
    origin: "http://localhost:3000",
    methods: "GET,POST,PUT,DELETE",
    credentials : true
}))


module.exports = app