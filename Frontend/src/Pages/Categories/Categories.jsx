import React from 'react'
import Post from '../../Components/Post/Post';
import { usePostsContext } from '../../hooks/usePostsContext' 

const Categories = () => {

  const { posts } = usePostsContext();

  return (
    <div>
      Categories

      <div>
      {
          posts ? 
          posts.map((post)=>{
            return <Post  post={post} key={post._id} />
          })
          :
          ""
         }
      </div>
    </div>
  )
}

export default Categories
