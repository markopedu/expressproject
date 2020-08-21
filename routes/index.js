const express = require('express');
const router = express.Router();
const csrf = require('csurf');
const bodyParser = require('body-parser');
const passport = require('passport');


router.use(function (req, res, next) {
    res.locals.currentUser = req.user;
    res.locals.errors = req.flash('error');
    res.locals.infos = req.flash('info');
    next();
});

const csrfProtection = csrf({ cookie: true });
const parseForm = bodyParser.urlencoded({ extended: false });

/* GET home page. */
router.get('/', function(req, res, next) {
    const loggedInUserName = res.locals.currentUser ? res.locals.currentUser.username : '';
    const isLoggedIn = loggedInUserName !== '';
    res.render('index/index', { title: 'Express', loggedInUserName, isLoggedIn  });
});

router.get('/login', csrfProtection, function (req, res, next){
  res.render('index/login', { title: 'Login', csrfToken: req.csrfToken() });
})

router.post('/login', parseForm, csrfProtection, passport.authenticate('login', {
    successRedirect: '/',
    failureRedirect: '/login',
    failureFlash: true
}));

router.get('/logout', function(req, res, next){
    req.logout();
    res.redirect('/');
})

module.exports = router;
