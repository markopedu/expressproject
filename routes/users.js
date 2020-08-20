const express = require('express');
const router = express.Router();

const model = require('../models/index');



/* GET users listing. */
router.get('/',  async function (req, res, next) {
  const users = await model.User.find();
  console.log('users: ', users);

  res.render('users', { title: 'Users', users: users });
});

router.get('/:id', async function(req, res, next) {

  const { id } = req.params;

  if(id === 'create') {
    next();
  }

  const user = await model.User.findById(id);

  const messages = await model.Message.find({ user: id });

  console.log('msg: ', messages);

  res.render('user', { title: 'The User', user, id, messages });
});

router.get('/create', async function(req, res, next) {
   res.render('createuser', {  title: 'Create User' });
});

router.post('/create', async function(req, res, next) {

  const { username } = req.body;

  const existingUser = model.User.findOne({ username: username });

  if(existingUser) {
     res.redirect('/users');
  }

  const user = new model.User({
        username: username
  });

  await user.save();

  res.redirect('/users');
});

router.post('/message', async function (req, res, next) {
    const { id, textMessage } = req.body;

    console.log('add message: ', id, textMessage);
    const message = new model.Message({
        text: textMessage,
        user: id
    });

    await message.save();

   res.redirect(`/users/${id}`);
});

module.exports = router;
