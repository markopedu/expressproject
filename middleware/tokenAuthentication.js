const jwt = require('jsonwebtoken');

module.exports = function (req, res, next) {
        const authHeader = req.headers['authorization'];
        const token = authHeader && authHeader.split(' ')[1];

        if(token == null) {  res.sendStatus(401); }

        jwt.verify(token, process.env.TOKEN_SECRET, function (err, userId) {
             if(err) { res.sendStatus(403); }

             console.log('jwt verify: ', userId);
             res.userId = userId;
             next();
        });
};