var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Users = new Schema({
    username: { type: String, required: true }, // twitter id
    created_at: { type: Date, default: Date.now, required: true },
    updated_at: { type: Date, default: Date.now, required: true },
    last_loggedin_at: { type: Date, default: Date.now, required: true }
});

/**
 * ログイン処理
 * 指定されたusernameが存在しなければ作成する
 */
Users.static('login', function (username, callback) {
    var that = this;
    callback = callback || function () {};

    that.findOne({ username: username }, function (err, user) {
        if (err) {
            callback(err);
        } else if (user) {
            // 既にユーザが作成されている
            user.last_loggedin_at = Date.now();
            user.save(function (err) {
                if (err) { callback(err); }
                else     { callback(null, user); }
            });
        } else {
            // ユーザの新規作成
            var newUser = new that({ username: username });
            newUser.save(function (err) {
                if (err) { callback(err); }
                else     { callback(null, newUser); }
            });
        }
    });
});

module.exports = mongoose.model('User', Users);
