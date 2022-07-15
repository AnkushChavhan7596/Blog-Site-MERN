const router = require("express").Router();

const {post_comment, delete_comment, all_comments } = require("../controllers/commentController");


router.post("/comment/:id", post_comment);
router.delete("/delete-comment/:id", delete_comment);
router.get("/all-comments", all_comments)

module.exports = router;