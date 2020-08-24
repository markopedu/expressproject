const User = require('./user');

module.exports = function (username, password, done) {
    User.findOne({ username: username }, function (err, user) {
        if(err) { return done(err); }

        if(!user) {
            return done(null, false, { message: 'No User has that username!' });
        }

        user.checkPassword(password, function (err, isMatch) {
            if(err) { return done(err); }

            console.log('Login Attempt: ', user, isMatch);

            if(isMatch) {
                return done(null, user);
            } else {
                return done(null, false, { message: 'Invalid Password.' });
            }
        });
    });
};