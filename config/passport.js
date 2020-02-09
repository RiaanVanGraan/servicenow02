var LocalStrategy = require('passport-local').Strategy;
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
var Company = require('../models/company.model.js');
var passport = require('passport');
var keys = require('./keys');

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser((id, done) => {
    Company.findById(id).then((user) => {
        done(null, user);
    });
});

// Local login
passport.use(new LocalStrategy(
    function (username, password, done) {
        console.log(username + password);
        Company.findOne({ username: username }, function (err, user) {
            if (err) { return done(err); }
            if (!user) {
                console.log('Incorrect username');
                return done(null, false);
            }
            if (user.password != password) {
                console.log('Incorrect password');
                return done(null, false);
            }
            console.log('Logged in')
            return done(null, user);
        });
    }
));

// Google login
passport.use(new GoogleStrategy({
    callbackURL: '/google/redirect',
    clientID: keys.google.clientID,
    clientSecret: keys.google.clientSecret
},
    (accessToken, refreshToken, profile, done) => {
        console.log('Passport callback function fired');
        console.log(profile);
        Company.findOne({ username: profile.id }).then((currentUser) => {
            if (currentUser) {
                //have this user in our db
                console.log('new User ' + currentUser);
                done(null, currentUser);
            } else {
                //user not saved in DB so save
                new Company({
                    username: profile.displayName,
                    name: 'Empty',
                    email: 'Empty',
                    keywords: ['Empty', 'Empty', 'Empty'],
                    description: 'Empty',
                    administrator: false,
                    visible: true
                }).save().then((newUser) => {
                    console.log('new User ' + newUser);
                    done(null, newUser);
                });
            }
        });
    }));









