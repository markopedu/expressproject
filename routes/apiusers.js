const express = require('express');
const router = express.Router();

const model = require('../models/index');

function filterUser(user) {
    return {
        id: user._id,
        username:  user.username,
        bio: user.bio
    };
}


router.get('/', async function (req, res, next) {
    await model.User.find({}, function(err, users) {
        if(err) { res.send(null); }

        const filteredUsers = users.map((user) => {
            return filterUser(user);
        });
        res.send(filteredUsers);
    });
});

router.get('/:id', async function (req, res, next) {
     const { id } = req.params;

     await model.User.findById(id, function (err, user) {
         if(err) { res.send(null); }
         res.send(filterUser(user));
     });
});




module.exports = router;