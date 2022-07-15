import React, { useEffect , useState } from 'react';
import "../Home/Home.css";
import axios from 'axios';
import Post from '../../Components/Post/Post';
import Cookies from 'js-cookie';
import BeforeSignHome from '../../Components/BeforeSignHome/BeforeSignHome';
import { useNavigate } from 'react-router-dom';
import ControlledCarousel from '../../Components/Carosel/ControlledCarousel';
import BlogPostCardHome from '../../Components/BlogPostCardHome/BlogPostCardHome';
import { useActiveUserContext } from '../../hooks/useActiveUserContext';
import { usePostsContext } from '../../hooks/usePostsContext';
import { useUsersContext } from '../../hooks/useUsersContext';
// import { useCommentsContext } from "../../hooks/useCommentsContext";
import SearchResult from '../../Components/SearchResult/SearchResult';
import Overlay from '../../Components/Overlay/Overlay';
import { useCommentsContext } from '../../hooks/useCommentsContext';

const Home = () => {

  const navigate = useNavigate();
  const {comments, dispatchComments} = useCommentsContext();

  const {posts, dispatch} = usePostsContext(); // values are destructuring
  const {activeUser, dispatchActiceUser} = useActiveUserContext();
  const {users, dispatchUsers} = useUsersContext();
  // const {comments, dispatchComments} = useCommentsContext();

  const [allPosts, setAllPosts] = useState();
  const [cate, setCate] = useState();


  // handle filter category
  const filterCategory = (category) =>{
    console.log(category)
    setCate(category);
    if(category === "all"){
      setAllPosts(posts);
    }
    else{
      const tempArray = posts.filter((post) => post.category === category);
      setAllPosts(tempArray);
    }
   
  }

  

  useEffect(()=>{
      navigate("/", {replace : true});

        // fetch active user
      const fetchActiveUser = async () =>{
        try{

          if(Cookies.get("jwt")){
              const res = await axios.post("/api/auth/active-user", {token : Cookies.get("jwt")} );

              if(res.status === 200){
                console.log(res.data.user);
                dispatchActiceUser({type : "GET_ACTIVE_USER", payload : res.data.user});
              }
              
            }
          }
          catch(error){
            console.log(error.message);
          }
      }

        // fetching all posts 
        const fetchPosts = async () =>{
          try{
            const res = await axios.get("/api/posts/posts");

            if(res.status === 200){
              setAllPosts(res.data.posts);
              dispatch({type :"SET_POSTS", payload : res.data.posts.reverse()})
            }
            else{
              console.log(res.data.msg)
            }

          }catch(error){
            console.log(error.message);
          }
      }

      // fetch users
      const fetchUsers = async () =>{
        try{
          const res = await axios.get("/api/auth/all-users");

          if(res.status === 200){
             dispatchUsers({type : "SET_USERS", payload : res.data.users});
             console.log(users)
          }
        }
        catch(error){
          console.log(error.message);
        }
      }


      // fetch comments
      const fetchComments = async () =>{
        try{
          const res = await axios.get("/api/comments/all-comments");

          if(res.status === 200){
            dispatchComments({ type : "SET_COMMENTS" , payload : res.data.comments});
          }
        }
        catch(error){
          console.log(error.message);
        }
      }

     fetchPosts();
     fetchActiveUser();
     fetchUsers();
     fetchComments();

  },[])

  return (
    <div className='home'>

      <div className="home_wrapper">
            <div className="leftHome">
                  {
                  Cookies.get("jwt") && activeUser ? 

                  allPosts?.length === 0 ? <p className='posts_not_found'>No Posts of {cate} Category 😢</p>: 
                  allPosts?.reverse().map((post)=>{
                    return <BlogPostCardHome key={post._id} post={post} />
                  })
                   
                  :
                  <BeforeSignHome /> 
                }
            </div>
            {activeUser?
              <div className="rightHome">
                 <h2 className='catogory_heading'>Categories</h2>
                 <div className="categories_wrapper">
                      <span className='category_item' onClick={()=> filterCategory("Sports")}>Sports</span>
                      <span className='category_item' onClick={()=> filterCategory("nature")}>Nature</span>
                      <span className='category_item' onClick={()=> filterCategory("education")}>Education</span>
                      <span className='category_item' onClick={()=> filterCategory("pollution")}>Pollution</span>
                      <span className='category_item' onClick={()=> filterCategory("covid")}>Covid</span>
                      <span className='category_item' onClick={()=> filterCategory("war")}>War</span>
                      <span onClick={()=> filterCategory("other")}>Other</span>
                      <span className='category_item' onClick={()=> filterCategory("all")}>All</span>
                 </div>
            </div>
            :
            ""
            }
            
      </div>
       
    </div>
  )
}

export default Home