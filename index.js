const mongoose = require('mongoose');
const app = require('./app');

const User = require('./models/user');

const setUpPassport = require('./models/setuppassport');

mongoose.connect(process.env.DATABASE);
setUpPassport();

mongoose.Promise = global.Promise;

mongoose.connection.on('connected', async () => {
    console.log('Mongoose connected!');


    // SEED
    const users = await User.find();

    users.forEach(user => {

        if(user.password === null) {
            user.password = 'secret';
            user.role = 'USER';
            user.save();
        }
    });

    // SEED - DEFAULT USER
    const johnDoe = await User.findOne({ username: 'JohnDoe' });

    if(!johnDoe) {
        const user = new User({
            username: 'JohnDoe',
            password: 'secret',
            role: 'USER'
        });

        user.save();
    }

});

mongoose.connection.on('disconnected', () => {
    console.log('Mongoose disconnected!');
});

mongoose.connection.on('error', (err) => {
    console.error(err.message);
    process.exit(1);
});

require('./models/index');

app.listen(process.env.PORT, () => {
    Object.keys(process.env).forEach((key) => console.info(`${key}: ${process.env[key]}`));
});
