import passport from 'passport';
const GoogleStrategy = require( 'passport-google-oauth2' ).Strategy;
import Settings from '../models/Settings';

passport.use(new GoogleStrategy({
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: 'http://localhost:4000/auth/google/callback',
        passReqToCallback: true,
    },
    async function(request, accessToken, refreshToken, profile, done) {
        await Settings.collection.drop();
        await new Settings({ refreshToken }).save();
        done(null, profile);
    }
));

passport.serializeUser(function (user, done) {
    done(null, user);
});

passport.deserializeUser(function (user, done) {
    done(null, user);
});