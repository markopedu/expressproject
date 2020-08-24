const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const loginuser = require('../models/loginuser');


router.post('/login', function (req, res, next){
       const { username, password } = req.body;

        loginuser(username, password, function (obj, user, message) {
                console.log('loginUser: ', obj, user, message);
               if(user) {
                   const token = jwt.sign(user._id.toString(), process.env.TOKEN_SECRET);
                   res.json({
                       id: user._id,
                       username: user.username,
                       token: token
                   });
               } else {
                   res.json({
                       message: message
                   })
               }
        });

});

module.exports = router;


