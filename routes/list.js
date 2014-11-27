var express = require('express');
var router = express.Router();
var Problem = require('../lib/model/problem');
var app = module.parent.exports;

router.get('/', function (req, res) {
    Problem.find({}, function (err, problems) {
        if (err) {
            console.log(err);
            throw err;
        }
        res.render('list', {
            title: '問題作成｜PracticeSurvey',
            username: app.locals.isLogin(req) ? req.session.passport.user.username : null,
            problems: problems
        });
    });
});

module.exports = router;
