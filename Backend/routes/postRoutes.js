
const router = require("express").Router();
const { create_post, get_post, all_posts, delete_post, update_post, like_dislike  } = require("../controllers/postController");

router.post("/create-post", create_post);
router.get("/post/:id", get_post);
router.get("/posts", all_posts);
router.delete("/delete-post/:id", delete_post);
router.patch("/update-post/:id", update_post)
router.post("/like-dislike/:id", like_dislike);

module.exports = router;

// const router = require("express").Router();
// const postControllers = require("../controllers/postController");

// router.post("/create-post", postControllers.create_post);
// router.get("/all-posts", postControllers.all_posts);
// router.get("/delete/post/:id", postControllers.delete_post);
// router.post("/post/:id", postControllers.get_post);

// module.exports = router;