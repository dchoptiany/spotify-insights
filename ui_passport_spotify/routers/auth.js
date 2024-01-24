const router = require("express").Router();
const passport = require("passport");

//Client URL for redirect after authentication
const CLIENT_URL = "http://aws_hostname:3000";

//Route handling successful login
router.get("/login/success", (req, res) => {
  if (req.user) {
    res.status(200).json({
      success: true,
      message: "successfull",
      user: req.user,
    });
  }
});

//Route handling failed login
router.get("/login/failed", (req, res) => {
  res.status(401).json({
    success: false,
    message: "failure",
  });
});


//Route handling logout and redirect
router.get("/logout", (req, res) => {
  req.logout();
  res.redirect(CLIENT_URL);
});

router.get("/spotify", passport.authenticate('spotify', {
    showDialog: true,
    scope: [ 'user-read-email','user-read-private', 'user-library-read', 'user-top-read', 'user-follow-read'],

  }));


//Route handling Spotify authentication callback
router.get(
  "/spotify/callback",
  passport.authenticate('spotify', 
  {
    failureRedirect: '/login/failed',
    successRedirect: CLIENT_URL,
})
);

module.exports = router
