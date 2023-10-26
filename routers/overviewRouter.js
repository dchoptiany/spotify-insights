const express = require('express');
const overviewRouter = express.Router()
const overviewFunc = require('./../controllers/overviewController.js')


overviewRouter.route('/').get(overviewFunc.sendResponce);

module.exports = overviewRouter