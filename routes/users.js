const express = require('express');
const router = express.Router();

const model = require('../models/index');



/* GET users listing. */
router.get('/',  async function (req, res, next) {
  const users = await model.User.find();
  console.log('users: ', users);

  res.render('users', { title: 'Users', users: users });
});

module.exports = router;
