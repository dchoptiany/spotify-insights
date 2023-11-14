const router = require("express").Router();
const passport = require("passport");
const apiActions = require("./../controllers/apiActions");

router.get("/api_data", (req, res) => {
    if (req.user) {
        const accessToken = req.user.accessToken;
        const apiEndpoint = req.headers.endpoint;

        apiActions(apiEndpoint, accessToken)
        .then((userData) => {
          console.log( userData);
          res.redirect('http://localhost:3000');
        })
        .catch((error) => {
          res.redirect('/error');
        });
    }

    })

module.exports = router
    