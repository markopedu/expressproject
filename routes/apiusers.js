const express = require('express');
const router = express.Router();

const tokenAuthentication = require('../middleware/tokenAuthentication');

const model = require('../models/index');

function filterUser(user) {
    return {
        id: user._id,
        username:  user.username,
        bio: user.bio
    };
}


router.get('/', tokenAuthentication, async function (req, res, next) {
    await model.User.find({}, function(err, users) {
        if(err) { res.sendStatus(500); }

        const filteredUsers = users.map((user) => {
            return filterUser(user);
        });
        res.send(filteredUsers);
    });
});

router.get('/:id', tokenAuthentication, async function (req, res, next) {
     const { id } = req.params;

     console.log('user: ', res.userId);

     await model.User.findById(id, function (err, user) {
         if(err) { res.sendStatus(500); }

         res.send(filterUser(user));
     });
});




module.exports = router;