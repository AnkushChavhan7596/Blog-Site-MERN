import React, { useState } from 'react'
// import {DeleteIcon} from '@mui/icons-material/';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import "./BlogPostCardHome.css";
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { Link, useNavigate } from 'react-router-dom';
import axios from "axios";
import { usePostsContext } from '../../hooks/usePostsContext';
import { useActiveUserContext } from '../../hooks/useActiveUserContext';
import { useSearchResultContext } from '../../hooks/useSearchContext';

const BlogPostCardHome = ({post}) => {

    const navigate = useNavigate();


    const {searchResultStyle,searchResultDispatch} = useSearchResultContext();

    const { activeUser } = useActiveUserContext();

    const {posts, dispatch} = usePostsContext();

    const [likeCount, setLikeCount] = useState(post.likes.length);
    const [alredyLiked, setAlreadyLiked] = useState("fa-solid fa-heart red");
    const [nonLiked, setNonLiked] = useState("far fa-heart");
    const [likeStyle, setLikeStyle] = useState("far fa-heart");

    // handle delete post
    const handleDelete = async (id) =>{
        console.log(id)

        try{
           const res = await axios.delete(`/api/posts/delete-post/${id}`);

           if(res.status === 200){
            console.log(res.data);
            dispatch({type : "DELETE_POST", payload : res.data.post})
           }
           else{
            console.log("Post not deleted , Something wents wrong");
           }
        }
        catch(error){
            console.log(error.message);
        }
    }

    // handle like dislike
    const handleLikeDislike = async (postId) =>{
        console.log(postId)

        try{
            const res = await axios.post(`/api/posts/like-dislike/${postId}`, {userId : activeUser._id });

            if(res.status == 200){
                console.log(res.data.msg);
                setLikeCount(res.data.liked ? likeCount + 1 : likeCount - 1);
            }
            else{
                console.log("post not liked or disliked")
            }

        }
        catch(error){
            console.log(error.message);
        }

    }


    

  return (
    <div className='blog-post-card-home'>
        <div className="blog-post-home-image_wrapper">
            <img src={post?.postImage} alt="post image" />
        </div>

        <div className="post_home_title">
            <p>{post?.title}</p>
        </div>

        <div className="post_home_description">
            <p>{post?.description}</p>
        </div>

        <div className="post_home_bottom_wrapper">
            <div className="left">
                <div className="like">
                    {/* {
                       post?.likes.includes(activeUser._id) ?
                      
                       <FavoriteIcon  size="large" className='like_icon liked' onClick={()=> handleLikeDislike(post._id)}/>
                       :
                       <FavoriteBorderIcon size="large" className='like_icon' onClick={()=> handleLikeDislike(post._id)} />
                    } */}

                    {
                         <p
                         className='like_actual_icon'
                         onClick={() => {
                            handleLikeDislike(post?._id);
                         }}
                       >
                         {post?.likes.includes(activeUser?._id) ? (
                           <i
                             className={`${alredyLiked}`}
                             onClick={
                               alredyLiked === "fa-solid fa-heart red"
                                 ? () => setAlreadyLiked("far fa-heart")
                                 : () => setAlreadyLiked("fa-solid fa-heart red")
                             }
                           ></i>
                         ) : (
                           <i
                             className={`${nonLiked}`}
                             onClick={
                               nonLiked === "far fa-heart"
                                 ? () => setNonLiked("fa-solid fa-heart red")
                                 : () => setNonLiked("far fa-heart")
                             }
                           ></i>
                         )}

                         <span className="like_count">{likeCount}</span>
                       </p>
                    }
                    
                </div>
                <Link className='view_post_home' to={`/post/${post?._id}`} >View Post</Link>
            </div>
            <div className="right">
                {
                    activeUser._id === post?.authorId ? 
                    <>
                        <p className="post_icon_wrapper"><Link to={`/update-post/${post?._id}`}><EditIcon className='post_icon' /></Link></p>
                        <p className="post_icon_wrapper" onClick={() => {handleDelete(post?._id)}}><Link to="/"><DeleteIcon className='post_icon delete_post_icon_home'  /></Link></p>
                    </>
                    :
                    ""
                }
                
            </div>
        </div>
    </div>
  )
}

export default BlogPostCardHome