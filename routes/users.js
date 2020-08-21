const express = require('express');
const router = express.Router();
const csrf = require('csurf');
const bodyParser = require('body-parser');

const model = require('../models/index');

const csrfProtection = csrf({ cookie: true });
const parseForm = bodyParser.urlencoded({ extended: false });

function ensureAuthenticated(req, res, next) {
    if(req.isAuthenticated()) {
        next();
    } else {
        req.flash('info', 'You must be logged in to see this page.');
        res.redirect('/');
    }
}

/* GET users listing. */
router.get('/', ensureAuthenticated, async function (req, res, next) {
  const users = await model.User.find();

  res.render('users/users', { title: 'Users', users: users });
});

router.get('/:id', ensureAuthenticated, csrfProtection, async function(req, res, next) {

  const { id } = req.params;

  if(id === 'create') {
    next();
  }

  const user = await model.User.findById(id);
  const messages = await model.Message.find({ user: id });

  res.render('users/user', { title: 'The User', user, id, messages, csrfToken: req.csrfToken() });
});

router.get('/create', ensureAuthenticated, csrfProtection, async function(req, res, next) {
   res.render('users/createuser', {  title: 'Create User', csrfToken: req.csrfToken() });
});

router.post('/create', ensureAuthenticated, parseForm, csrfProtection, async function(req, res, next) {

  const { username, password } = req.body;

  const existingUser = model.User.findOne({ username: username });

  if(existingUser) {
     res.redirect('/users');
  }

  const user = new model.User({
        username: username,
        password: password,
        role: 'USER'
  });

  await user.save();

  res.redirect('/users');
});

router.post('/message', ensureAuthenticated, parseForm, csrfProtection, async function (req, res, next) {
    const { id, textMessage } = req.body;

    const message = new model.Message({
        text: textMessage,
        user: id
    });

    await message.save();

   res.redirect(`/users/${id}`);
});

module.exports = router;
