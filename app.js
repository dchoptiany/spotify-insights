const express = require("express");
const overviewRouter = require('./routers/overviewRouter')


const app = express();

//Middlewares
app.use(express.json())


//Routers
app.use('/overview', overviewRouter);


module.exports = app