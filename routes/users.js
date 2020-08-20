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

  if(typeof id !== "number" ||  id === 'create') {
    next();
  }

  const user = await model.User.findById(id);

  res.render('user', { title: 'The User', user, id });
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

module.exports = router;
