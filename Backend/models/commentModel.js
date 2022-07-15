const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema({
    postId : {
        type : String,
        required : true
    },

    authorId : {
        type : String,
        required : true
    },

    comment : {
        type : String,
        required : true
    }
});

const Comment = mongoose.model("comment", commentSchema);

module.exports = Comment;