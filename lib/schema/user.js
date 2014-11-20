var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Users = new Schema({
    user_id: { type: String, required: true }, // twitter id
    created_at: { type: Date, default: Date.now, required: true },
    updated_at: { type: Date, default: Date.now, required: true }
});

module.exports = mongoose.model('User', Users);
