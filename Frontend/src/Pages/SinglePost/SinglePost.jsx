import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom';
import { usePostsContext } from '../../hooks/usePostsContext';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import "./SinglePost.css";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { format } from "timeago.js";
import Comments from '../../Components/Comments/Comments';

import { useUsersContext } from '../../hooks/useUsersContext';
import { useActiveUserContext } from '../../hooks/useActiveUserContext';

const SinglePost = () => {


  const { posts ,dispatch} = usePostsContext();
  const {users} = useUsersContext();
  const { activeUser} = useActiveUserContext();

  const { id } = useParams();

  const [currentPost, setCurrentPost] = useState();
  const [postAuthor, setPostAuthor] = useState();
  const [likeCount, setLikeCount] = useState(0);
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


    // useEffect(()=>{
    //   const fetchPostAuthor = async () =>{
    //     try{
    //         const res = await axios.get(`/api/auth/user/${currentPost?.authorId}`);
    
    //         if(res.status === 200){
    //         console.log(res.data.user)
    //         setPostAuthor(res.data.user);
    //         }
    //         else{
    //           console.log("User not found");
    //         }
    //     }
    //     catch(error){
    //       console.log(error.message);
    //     }
    //   }
      
    //    fetchPostAuthor();
    //  },[])


    
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





    useEffect(()=>{

   // fetch current post
   const fetchCurrentPost = async () =>{
    try{

       const res = await axios.get(`/api/posts/post/${id}`);

       if(res.status === 200){
        console.log(res.data.post)
        setCurrentPost(res.data.post);
        setLikeCount(res.data.post.likes.length)

        users?.map((user)=>{
         if(user._id === res.data.post.authorId){
           setPostAuthor(user);
         }
        })
       }
       else{
         console.log("Post not found");
       }

    }catch(error){
      console.log(error.message);
    }
   }



  fetchCurrentPost();
 },[])


  return (
    <div className='single_blog_post_wrapper'>
      <div className="single_blog_post">
        <Link to={`/profile/${postAuthor?._id}`}>
          {
            postAuthor?
            <div className="blog_post_author_single">
              <div className="left">
                <img src={postAuthor?postAuthor.profileImage : ""}alt="" />
              </div>
              <div className="author_name_wrapper">
                <h2>{postAuthor?postAuthor.name:"XYZ"}</h2>
              </div>
            </div>
            :
            ""
          }
        </Link>

        <div className="single_post_img_wrapper">
          <img src={currentPost?currentPost.postImage:""} alt="postImg" />
        </div>

        <div className="title_and_buttons_wrapper">
            <div className="single_post_title_wrappper">
              <p>{currentPost?currentPost.title : ""}</p>
            </div>

            <div className="buttons_wrapper">
               <p className="post_icon_wrapper"><Link to={`/update-post/${currentPost?currentPost._id:null}`}><EditIcon className='post_icon' /></Link></p>
               <p className="post_icon_wrapper" onClick={() => {handleDelete(currentPost?currentPost._id:null)}}><Link to="/"><DeleteIcon className='post_icon delete_post_icon_home'  /></Link></p>
            </div>
        </div>

        <div className="author_and_timestamps">
          <p><span className='author_txxt'>Author</span> : {postAuthor?.name}</p>
          {
            postAuthor ?
            <p>{format(postAuthor.updatedAt)}</p>
            :
            ""
          }
        </div>

        <div className="likes_div">
                {/* <div className="like">
                    {
                       currentPost?.likes.includes(activeUser?._id) ?
                      
                       <FavoriteIcon  size="large" className='like_icon liked' onClick={()=> handleLikeDislike(currentPost?._id)}/>
                       :
                       <FavoriteBorderIcon size="large" className='like_icon' onClick={()=> handleLikeDislike(currentPost?._id)} />
                    }
                    
                    <span className="like_count">{currentPost?.likes.length}</span>
                </div> */}


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
                            handleLikeDislike(currentPost?._id);
                         }}
                       >
                         {currentPost?.likes.includes(activeUser?._id) ? (
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
        </div>
       
        <div className="single_post_description_wrapper">
          <p>{currentPost?currentPost.description:""}</p>
        </div>

        {/* comments senction */}
        <Comments post={currentPost} />
      </div>


    

      
    </div>
  )
}

export default SinglePost