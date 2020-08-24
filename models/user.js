const mongoose = require('mongoose');
const bcrypt = require('bcrypt-nodejs');

const SALT_FACTOR = 10;

const noop = function () {};

const userSchema = new mongoose.Schema({
        username: {type: String, unique: true, required: true},
        password: {type: String, required:true, default: null },
        bio: { type: String, default: '' },
        role: { type: String, enum: [ 'USER', 'ADMIN' ], default: 'USER' },
    },
    { timestamps: true },
);

userSchema.methods.generateHash = function (password) {
    return bcrypt.hashSync(password, bcrypt.genSalt(8), null);
};

userSchema.methods.checkPassword = function (password, done) {
    bcrypt.compare(password, this.password, function (err, isMatch) {
        done(err, isMatch);
    });
};

userSchema.methods.findApiUsers = function () {
    return this.find();
}

userSchema.statics.findByLogin = async function(login) {
        let user = await this.findOne({
            username: login,
        });

        if(!user) {
            user = await this.findOne({ email: login });
        }

        return user;
};

userSchema.pre('remove', function(next) {
    this.model('Message').deleteMany({ user: this._id }, next);
});

userSchema.pre('save', function (done) {
     const user = this;

     if(!user.isModified('password')){
         return done();
     }

     bcrypt.genSalt(SALT_FACTOR, function (err, salt) {
          if (err) { return done(err); }

          bcrypt.hash(user.password, salt, noop, function (err, hashedPassword) {
                if (err) { return done(err); }

                console.log('user pw: ', user.password, hashedPassword);

                user.password = hashedPassword;
                done();
          });
     });

});

const User = mongoose.model('User', userSchema);

module.exports = User;