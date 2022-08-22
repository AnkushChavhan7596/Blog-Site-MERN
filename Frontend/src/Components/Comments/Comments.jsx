import React, { useState, useEffect } from "react";
import "./Comments.css";
import Comment from "../Comment/Comment";
import axios from "axios";
import { useActiveUserContext } from "../../hooks/useActiveUserContext";
import { useCommentsContext } from "../../hooks/useCommentsContext";

const Comments = ({ post }) => {
  const { activeUser } = useActiveUserContext();

  const [comment, setComment] = useState();
  const { comments, dispatchComments } = useCommentsContext();

  console.log(activeUser);

  const handleComment = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(`/api/comments/comment/${activeUser?._id}`, {
        postId: post._id,
        comment: comment,
      });

      if (res.status === 200) {
        console.log(res.data.msg);
        console.log(res.data.comment);
        dispatchComments({ type: "ADD_COMMENT", payload: res.data.comment });
        setComment("");
      } else {
        console.log("Comment not posted");
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className="comments_section">
      <h5 className="add_comment_txt">Add Comment</h5>

      <div className="comment_form_wrapper">
        <form onSubmit={handleComment}>
          <div className="input_field">
            <textarea
              type="text"
              value={comment}
              onChange={(e) => {
                setComment(e.target.value);
              }}
              placeholder="Enter Comment ....."
              required
            />
          </div>
          <div className="comment_btn_wrapper">
            <button type="submit">Comment</button>
          </div>
        </form>
      </div>

      <h2 className="comments_heading">Comments : </h2>

      <div className="comments_wrapper">
        {
          // comments?.filter((comment) => comment.authorId === post?.authorId).reverse()?.map((comment)=>{
          //   return <Comment comment={comment} key={comment._id} />

          comments?.filter((comment) => comment.postId === post?._id).length !==
          0 ? (
            comments
              ?.filter((comment) => comment.postId === post?._id)
              .reverse()
              .map((comment) => {
                return <Comment comment={comment} post={post} key={comment._id} />;
              })
          ) : (
            <h4 className="no_comment_txt">Being first to post Comment</h4>
          )
        }
      </div>
    </div>
  );
};

export default Comments;
