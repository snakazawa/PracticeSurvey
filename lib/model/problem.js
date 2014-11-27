var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var User = require('./user');

var Problems = new Schema({

    name: { type: String, required: true },
    content: { type: String, required: true },
    master_user: { type: Schema.ObjectId, ref: 'User', required: true },
    admin_list: [{ type: Schema.ObjectId, ref: 'User'}],
    created_at: { type: Date, default: Date.now, required: true },
    updated_at: { type: Date, default: Date.now, required: true }
});

/**
 * 問題の新規作成
 * master_userのusernameをparamsのプロパティに指定する
 */
Problems.static('create', function (params, callback) {
    var that = this;
    callback = callback || function () {};

    User.findOne({ username: params.username }, function (err, user) {
        if (err) {
            callback(err);
            return;
        }

        if (!user) {
            callback(new Error('username not found'));
            return;
        }


        // 問題の新規作成
        params.master_user = user.id;
        var newProblem = new that(params);
        newProblem.save(function (err){
            if (err) {
                callback(err);
            } else {
                callback(null, newProblem);
            }
        })
    });
});

/**
 * 問題IDから問題を検索し、情報を保管して返す
 */
Problems.static('getById', function (id, callback) {
    this.findById(id, function (err, problem) {
        if (err) {
            callback(err);
            return;
        }

        if (!problem) {
            callback(new Error('problem not found'));
            return;
        }

        User.findById(problem.master_user, function (err, user) {
            if (err) {
                callback(err);
                return;
            }

            if (!user) {
                callback(new Error('problem not found'));
                return;
            }

            callback(null, {
                problem: problem,
                master_user: user
            });
        });
    });
});

module.exports = mongoose.model('Problem', Problems);
