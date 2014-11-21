var express = require('express');
var router = express.Router();
var app = module.parent.exports;

// 問題作成ページ
router.get('/create', function (req, res) {
    res.render('problem/create', {
        title: '問題作成｜PracticeSurvey',
        username: app.locals.isLogin(req) ? app.session.passport.username : null
    });
});

// 問題作成の確認ページ
router.post('/verify', function (req, res) {
    // TODO:validation
    res.render('problem/verify', {
        title: '問題作成(確認)｜PracticeSurvey',
        name: req.body.name,
        content: req.body.content,
        master_user: app.locals.isLogin(req) ? app.session.passport.username : null
    });
});

// 問題作成の成功ページ
router.post('/success', function (req, res) {
    res.render('problem/success', {
        title: '問題作成完了｜PracticeSurvey'
    });
});

// 問題作成
router.post('/', function (req, res) {
    // TODO:validation
    // TODO:DBにinsert
    res.redirect('/');
});

module.exports = router;
