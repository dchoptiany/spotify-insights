// Configures Passport Spotify strategy with client ID, client secret, and callback URL.
const SpotifyStrategy = require('passport-spotify').Strategy;
const passport = require("passport");
const dotenv = require('dotenv');


dotenv.config({ path: './config.env' });

// Retrieves Spotify client ID and client secret from environment variables.
const SPOTIFY_CLIENT_ID = process.env.SPOTIFY_CLIENT_ID;
const SPOTIFY_CLIENT_SECRET = process.env.SPOTIFY_CLIENT_SECRET;

// Configures Passport to use Spotify authentication strategy.
passport.use(new SpotifyStrategy({
  clientID:  SPOTIFY_CLIENT_ID,
  clientSecret: SPOTIFY_CLIENT_SECRET,
  callbackURL: "/auth/spotify/callback",
  enableProof: true,
  scope: [ 'user-read-email','user-read-private', 'user-library-read', 'user-top-read', 'user-follow-read'],
  
 
},
// Callback function handling user authentication.
function (accessToken, refreshToken,expires_in, profile, done) {
  profile.accessToken = accessToken;
  profile.expiry = expires_in;
  done(null, profile);
}));


// Serializes and deserializes user information for session management.
passport.serializeUser((user, done)=>{
    done(null,user)
});

passport.deserializeUser((user, done)=>{
    done(null,user)
});
