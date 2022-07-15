import React from 'react'
import "./SearchResult.css"
import { usePostsContext } from '../../hooks/usePostsContext'
import Post from '../Post/Post'
import BlogPostCardHome from '../BlogPostCardHome/BlogPostCardHome'

const SearchResult = ({searchValue}) => {
  const {posts} = usePostsContext();

  return (
    <div className='search-result'>
      {
          posts?posts.filter((post) => post.title.trim()
          .toLowerCase().includes(searchValue) || post.description.trim()
          .toLowerCase().includes(searchValue) || post.category.trim()
          .toLowerCase().includes(searchValue)).map((post) =>{
            return <BlogPostCardHome post={post} key={post._id} />
          })
          :
          ""
      }
    </div>
  )
}

export default SearchResult
