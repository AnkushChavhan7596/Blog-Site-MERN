import axios from 'axios';
import React from 'react';
import { Link } from 'react-router-dom';
import { usePostsContext } from '../../hooks/usePostsContext';
import "./Post.css";

const Post = ({post}) => {

    const { dispatch } = usePostsContext();

    // handle delete
    const handleDelete = async () =>{

        try{

            const res = await axios.delete(`/api/posts/delete-post/${post._id}`);

            if(res.status === 200){
                console.log(res.data.post)
                console.log("Post deleted")

                dispatch({type :"DELETE_POST",  payload : res.data.post})
            }
            else{
                console.log("post not deleted");
            }

        }catch(error){
            console.log(error.message);
        }
        
    }
  return (
    <div className='post'>
        <h2>{post.title}</h2>
        <h2>{post.description}</h2>
        <h2>{post.category}</h2>
        <div className="image">
            <img src={post.postImage} alt="post image" />
        </div>

        <button onClick={handleDelete}>Delete</button>
        <button><Link to={`/update-post/${post._id}`}>Update</Link></button>
    </div>
  )
}

export default Post