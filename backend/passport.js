const SpotifyStrategy = require('passport-spotify').Strategy;
const passport = require("passport");
const dotenv = require('dotenv');


dotenv.config({ path: './backend/config.env' });

const SPOTIFY_CLIENT_ID = process.env.SPOTIFY_CLIENT_ID;
const SPOTIFY_CLIENT_SECRET = process.env.SPOTIFY_CLIENT_SECRET;


passport.use(new SpotifyStrategy({
  clientID:  SPOTIFY_CLIENT_ID,
  clientSecret: SPOTIFY_CLIENT_SECRET,
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