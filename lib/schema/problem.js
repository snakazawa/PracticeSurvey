var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Problems = new Schema({
    name: { type: String, required: true },
    content: { type: String, required: true },
    master_user: { type: Schema.ObjectId, ref: 'User', required: true },
    admin_list: [{ type: Schema.ObjectId, ref: 'User'}],
    created_at: { type: Date, default: Date.now, required: true },
    updated_at: { type: Date, default: Date.now, required: true }
});

module.exports = mongoose.model('Problem', Problems);
