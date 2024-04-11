const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const CommentSchema = new Schema({
    post: {type: Schema.Types.ObjectId, required: true},
    username: {type: String, required: true},
    message: {type: String, required: true}
});

module.exports = mongoose.model("Comment", CommentSchema);