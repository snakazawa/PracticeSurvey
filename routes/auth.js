var express = require('express');
var router = express.Router();
var app = module.parent.exports;
var passport = app.get('passport');

router.get('/twitter', passport.authenticate('twitter'));

router.get('/twitter/callback', passport.authenticate('twitter', {
    successRedirect: '/',
    failureRedirect: '/login'
}));

module.exports = router;
