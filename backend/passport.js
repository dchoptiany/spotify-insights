const SpotifyStrategy = require('passport-spotify').Strategy;
const passport = require("passport");

const SPOTIFY_CLIENT_ID = "90ec6685e54d40a2aeb635c633191c1d"
const SPOTIFY_CLIENT_SECRET="176eaea4634e4676b4f431c8b58a836d"


passport.use(new SpotifyStrategy({
  clientID: SPOTIFY_CLIENT_ID,
  clientSecret: SPOTIFY_CLIENT_SECRET,
  callbackURL: "/auth/spotify/callback"
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