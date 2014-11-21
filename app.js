var fs = require('fs');
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require("express-session");
var config = JSON.parse(fs.readFileSync('config.json', 'utf8'));

var app = express();
module.exports = app;

/*** transport ***/
var passport = require('passport');
var TwitterStrategy = require('passport-twitter').Strategy;
app.set('passport', passport);
// ログインしてるか ユーティリティ関数追加
app.locals.isLogin = function isLogin (req) {
    return !!req.session.passport.user;
};

passport.serializeUser(function (user, done) {
    done(null, user);
});
passport.deserializeUser(function (obj, done) {
    done(null, obj);
});

passport.use(
    new TwitterStrategy({
        consumerKey: config.twitter.consumerKey,
        consumerSecret: config.twitter.consumerSecret,
        callbackUrl: 'http://127.0.0.1:3000/auth/twitter/callback'
    }, function (token ,tokenSecret, profile, done) {
        process.nextTick(function () {
            return done(null, profile);
        });
    })
);
/*** /transport ***/

var routes = require('./routes/index');
var auth = require('./routes/auth');
var problem = require('./routes/problem');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(session({
    secret: "SECRET"
}));
app.use(express.static(path.join(__dirname, 'public')));
app.use(passport.initialize());
app.use(passport.session());

// routing
app.use('/', routes);
app.use('/auth', auth);
// 以下よりログイン必須
//app.use(function (req, res, next) {
//    if (app.locals.isLogin(req)) {
//        next();
//    } else {
//        res.redirect('/login?require=1');
//    }
//});
app.use('/problem', problem);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});

