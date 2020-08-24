const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const loginUser = require('./loginuser');

const model = require('../models/index');

module.exports = function () {

        passport.serializeUser(function (user, done) {
             done(null, user._id);
        });

        passport.deserializeUser(function (id, done) {
              model.User.findById(id, function (err, user) {
                  done(err, user);
              })
        });

        passport.use('login', new LocalStrategy(function(username, password, done) {
             return loginUser(username, password, done);
        }));

};