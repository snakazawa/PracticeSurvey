var express = require('express');
var router = express.Router();
var app = module.parent.exports;
var passport = app.get('passport');

/* home. */
router.get('/', function (req, res) {
    res.render('index', {
        title: 'PracticeSurvey',
        username: app.locals.isLogin(req) ? req.session.passport.user.username : null
    });
});

// ログイン失敗や、ログイン必要な時
router.get('/login', function (req, res) {
    res.render('index', {
        title: 'PracticeSurvey',
        username: app.locals.isLogin(req) ? req.session.passport.user.username : null
    });
});

module.exports = router;
