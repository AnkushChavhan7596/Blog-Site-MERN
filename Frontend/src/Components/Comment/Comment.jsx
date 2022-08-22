
import React, {useState, useEffect} from 'react'
import "./Comment.css"
import DeleteIcon from '@mui/icons-material/Delete';
import axios from 'axios';
import { Link } from "react-router-dom";
import { useCommentsContext } from '../../hooks/useCommentsContext';
import { useActiveUserContext } from '../../hooks/useActiveUserContext';

const Comment = ({comment, post}) => {

  const {comments, dispatchComments} = useCommentsContext();
  const {activeUser} = useActiveUserContext();
  console.log(comment)
  const [user, setUser] = useState();

  // handle comment delete
  const handleCommentDelete = async (id) =>{
    console.log(id)
    try{

      const res = await axios.delete(`/api/comments/delete-comment/${id}`);

      if(res.status === 200){
        dispatchComments({type :"DELETE_COMMENT", payload : res.data.comment});
        console.log("Post deleted successfully")
      }
      else{
        console.log("Post not deleted")
      }

    }
    catch(error){
      console.log(error.message);
    }
  }

  useEffect(() => {

    const fetchCommentAuthor = async () =>{
      try{
        const res = await axios.get(`/api/auth/user/${comment?.authorId}`);

        if(res.status === 200){
          console.log(res.data);
          setUser(res.data.user);
          console.log("The comment user is " + res.data)
        }
  
      }catch(error){
        console.log(error.message);
      }
    }

    fetchCommentAuthor();
    
  }, [])

  return (
    <div className='comment'>
      <div className="left">
        <Link to={`/profile/${user?._id}`}>
          <img src={user? user.profileImage : `https://social-media-ankush.herokuapp.com/public/Images/user (1).png`} alt="comment Img" />
        </Link>
      </div>

      <div className="right">
        <div className="header_name_comment">
            <div className='h1_cl'>
               <p>{user?.name} {post?.authorId === comment.authorId ? <span className='author_txt_txt'>Author</span> : ""}</p>
            </div>
            <div className='h1_cr'>
              {
              activeUser?._id === comment.authorId ?
              <p className='comment_del_com' onClick={() => handleCommentDelete(comment._id)}><DeleteIcon fontSize='small' className='comment_del'/></p>
              :
              ""
              }
            </div>
          
        </div>
        <div className="comment_txt_wrapper">
            <p> {comment?.comment}</p>
        </div>
        
      </div>
    </div>
  )
}

export default Comment
