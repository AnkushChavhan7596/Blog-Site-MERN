const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
    title :{
        type : String, required : true
    },
    description:{
        type : String,
        required : true
    },
    category : {
        type : String,
        required : true
    },
    authorId : {
        type : String,
        required : true
    },
    
    likes : [String],

    postImage : {
        type : String,
        default : "https://cdn.pixabay.com/photo/2016/05/05/02/37/sunset-1373171_960_720.jpg"
    }
},{timestamps : true});

const Post = mongoose.model("post", postSchema);

module.exports = Post;