var express = require('express');
var router = express.Router();
var Problem = require('../lib/model/problem');
var _ = require('underscore');

// 全てログイン必須

// 問題作成ページ
router.get('/create', function (req, res) {
    res.render('problem/create', {
        title: '問題作成｜PracticeSurvey',
        username: req.session.passport.user.username
    });
});

// 問題作成の確認ページ
router.post('/verify', function (req, res) {
    res.render('problem/verify', {
        title: '問題作成(確認)｜PracticeSurvey',
        name: req.body.name,
        content: req.body.content,
        master_user: req.session.passport.user.username
    });
});

// 問題作成の成功ページ
router.get('/success', function (req, res) {
    res.render('problem/success', {
        title: '問題作成完了｜PracticeSurvey'
    });
});

// 問題閲覧ページ
router.get('/view/:problem_id', function (req, res, next) {
    Problem.getById(req.params.problem_id, function (err, data) {
        if (err) {
            next();
        } else {
            res.render('problem/view', {
                title: 'Problem:' + data.problem.id + '｜PracticeSurvey',
                name: data.problem.name,
                content: data.problem.content,
                master_user: data.master_user.username
            });
        }
    });
});

// 問題作成
router.post('/', function (req, res) {
    Problem.create(_.extend({ username: req.session.passport.user.username }, req.body), function (err, newProblem) {
        if (err) {
            console.log(err);
            res.redirect('/problem/create?err=1');
        } else {
            console.log('create new problem', newProblem);
            res.redirect('/problem/success?problem_id=' + newProblem.id);
        }
    });

});

module.exports = router;
