const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const PostSchema = new Schema({
    title: {type: String, required: true},
    content: {type: String, required: true},
    thumbnail: {type: Schema.Types.Buffer},
    likes: {type: Number, default: 0},
    user: {type: Schema.Types.ObjectId, ref: "User", required: true},
    published: {type: Boolean, default: false},
    date: {type: Date, default: Date.now},
});

module.exports = mongoose.model("Post", PostSchema);