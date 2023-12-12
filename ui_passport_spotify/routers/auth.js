const router = require("express").Router();
const passport = require("passport");


const CLIENT_URL = "http://ec2-52-59-247-253.eu-central-1.compute.amazonaws.com:3000";

router.get("/login/success", (req, res) => {
  if (req.user) {
    res.status(200).json({
      success: true,
      message: "successfull",
      user: req.user,
    });
  }
});

router.get("/login/failed", (req, res) => {
  res.status(401).json({
    success: false,
    message: "failure",
  });
});

router.get("/logout", (req, res) => {
  req.logout();
  res.redirect(CLIENT_URL);
});

router.get("/spotify", passport.authenticate('spotify', {
    showDialog: true,
    scope: [ 'user-read-email','user-read-private', 'user-library-read'],

  }));

router.get(
  "/spotify/callback",
  passport.authenticate('spotify', 
  {
    failureRedirect: '/login/failed',
    successRedirect: CLIENT_URL,
})
);

module.exports = router
