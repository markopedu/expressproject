const mongoose = require('mongoose');
const app = require('./app');

const User = require('./models/user');

mongoose.connect(process.env.DATABASE);
mongoose.Promise = global.Promise;

mongoose.connection.on('connected', () => {
    console.log('Mongoose connected!');

    // const user = new User({
    //     username: 'Marko'
    // });
    //
    // user.save();
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
