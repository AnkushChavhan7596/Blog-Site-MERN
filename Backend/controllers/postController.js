const cloudinary = require("cloudinary").v2;
const postModel = require("../models/postModel");

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_USER_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const create_post = async (req, res) => {
  try {
    console.log(req.body);

    const file = req.files.blogImage;

    cloudinary.uploader.upload(file.tempFilePath, async (err, result) => {
      console.log(result);
      try {
        if (result) {
          console.log(result.url);
          console.log(req.body.activeUserId)

          const post = new postModel({
            title: req.body.title,
            description: req.body.description,
            category: req.body.category,
            authorId : req.body.activeUserId,
            postImage: result.url,
          });

          const savePost = await post.save();

          if (savePost) {
            res
              .status(200)
              .json({ post: savePost, msg: "Post created successfully !!" });

              console.log("Post created successfully")
          } else {
            res.json({ msg: "Something wents wrong" });
          }
        } else {
          console.log(err);
          res.json({ msg: err });
        }
      } catch (error) {
        res.json({ msg: error.message });
      }
    });
  } catch (error) {
    console.log(error);
  }
};

// get post
const get_post = async (req, res) => {

  const id = req.params.id;

  try{
    const post = await postModel.findById(id);

    if(post){
      res.status(200).json({post : post});
    }
    else{
      res.json({msg : "Post not found"});
    }
  }catch(error){
    console.log(error.message);
    res.json({msg : error.message});
  }
};

// all posts
const all_posts = async (req, res) => {
  try{

    const posts = await postModel.find();

    if(posts){
      res.status(200).json({msg : "Data fetched successfully", posts : posts})
    }

  }catch(error){
    console.log(error.message);
    res.json({msg : "Data can't fetch"});
  }
};


// update post
const update_post = async (req, res) => {

  console.log(req.params.id);
  console.log(req.body)
  console.log(req.files)

  try{

    if(req.files){

      const file = req.files.blogImage;

    cloudinary.uploader.upload(file.tempFilePath, async (err, result) => {
      console.log(result);
      try {
        if (result) {
          console.log(result.url);

          const post = await postModel.findByIdAndUpdate(req.params.id,{
            title: req.body.title,
            description: req.body.description,
            category: req.body.category,
            postImage: result.url,
          });

          const savePost = await post.save();

          if (savePost) {
            res
              .status(200)
              .json({ post: savePost, msg: "Post created successfully !!" });

              console.log("Post created successfully")
          } else {
            res.json({ msg: "Something wents wrong" });
          }
        } else {
          console.log(err);
          res.json({ msg: err });
        }
      } catch (error) {
        res.json({ msg: error.message });
      }
    });

    }
    else{ // image not updated

       const updatePost = await postModel.findByIdAndUpdate(req.params.id,{
        title : req.body.title,
        description : req.body.description,
        category : req.body.category
       });

       if(updatePost){
        res.status(200).json({msg : "Post updated successfully", post : updatePost});
       }
       else{
        res.json({msg : "Post not updated , Something wents wrong"});
       }

    }

  }catch(error){
    res.json({msg : error.message });
  }


};

// delete post
const delete_post = async (req, res) => {
  try{
    const deletePost = await postModel.findByIdAndDelete(req.params.id);

    if(deletePost){
      res.status(200).json({msg : "Post deleted Successfully", post : deletePost});
    }
    else{
      res.json({msg : "Post not deleted"})
    }

  }catch(error){
     console.log(error.message);
     res.json({msg : "Post not deleted"});
  }
};


// handle like dislike
const like_dislike = async (req, res) =>{
  try{
    const postId = req.params.id;
    const userId = req.body.userId;

    const post = await postModel.findById(postId);

    if(post){
      
      // like
      if(!post.likes.includes(userId)){
        await postModel.updateOne({_id : postId}, {$push : { likes : userId}});
        res.status(200).json({msg : "Post has been liked", liked : true})
        console.log("Post has been liked")
      }
      else{
        await postModel.updateOne({ _id : postId },{ $pull: { likes : userId }});
        res.status(200).json({msg : "Post has been disliked", liked : false});
        console.log("Post has been disliked");
      }
    }
    else{
      res.json({msg : "Something wents wrong", liked : false});
    }

  }
  catch(error){
    res.json({msg : error.message, liked : false});
  }
}

module.exports = {
  create_post,
  get_post,
  all_posts,
  update_post,
  delete_post,
  like_dislike
};
