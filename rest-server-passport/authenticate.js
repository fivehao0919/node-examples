var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var User = require('./models/user');
var config = require('./config');

exports.local = passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

var FacebookStrategy = require('passport-facebook').Strategy;

exports.facebook = passport.use(new FacebookStrategy({
    clientID: config.facebook.clientID,
    clientSecret: config.facebook.clientSecret,
    callbackURL: config.facebook.callbackURL
}, function (accessToken, refreshToken, profile, done) {
    User.findOne({ facebookId: profile.id }, function (err, user) {
        if (err) {
            console.log(err); //handle errors!
        }
        if (!err && user !== null) {
            done(null, user);
        } else {
            user = new User({
                username: profile.displayName
            });
            user.OauthId = profile.id;
            user.OauthToken = accessToken;
            user.save(function (err) {
                if (err) {
                    console.log(err); //handle errors!
                } else {
                    console.log("saving user ...");
                    done(null, user);
                }
            });
        }
    });
}));

var GitHubStrategy = require('passport-github').Strategy;
exports.github = passport.use(new GitHubStrategy({
    clientID: config.github.clientID,
    clientSecret: config.github.clientSecret,
    callbackURL: config.github.callbackURL
}, function(accessToken, refreshToken, profile, done) {
    User.findOne({ githubId: profile.id }, function (err, user) {
        if (err) {
            console.log(err); //handle errors!
        }
        if (!err && user !== null) {
            done(null, user);
        } else {
            user = new User({
                username: profile.displayName
            });
            user.OauthId = profile.id;
            user.OauthToken = accessToken;
            user.save(function (err) {
                if (err) {
                    console.log(err); //handle errors!
                } else {
                    console.log("saving user ...");
                    done(null, user);
                }
            });
        }
    });
}));
