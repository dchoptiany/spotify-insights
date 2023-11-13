const SpotifyStrategy = require('passport-spotify').Strategy;
const passport = require("passport");
const dotenv = require('dotenv');

dotenv.config({ path: './config.env' });


passport.use(new SpotifyStrategy({
  clientID: process.env.SPOTIFY_CLIENT_ID,
  clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
  callbackURL: "/auth/spotify/callback",
  enableProof: true,
  scope: [ 'user-read-email','user-read-private'],
  
 
},
function (accessToken, refreshToken, profile, done) {
  done(null, profile);
}));

passport.serializeUser((user, done)=>{
    done(null,user)
});

passport.deserializeUser((user, done)=>{
    done(null,user)
});