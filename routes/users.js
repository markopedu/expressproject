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
  const id = req.params.id;
  const user = await model.User.findById(id);

  res.render('user', { title: 'The User', user, id });
});

module.exports = router;
