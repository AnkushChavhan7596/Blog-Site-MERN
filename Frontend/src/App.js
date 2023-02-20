
import { Routes, Route } from "react-router-dom";
import axios from "axios";
import { useEffect } from "react";

// other imports
import Navbar from "./Components/Navbar/Navbar";
import Login from "../src/Pages/Login/Login";
import Register from "../src/Pages/Register/Register";
import Home from "../src/Pages/Home/Home";
import CreatePost from "./Pages/CreatePost/CreatePost";
import Categories from "./Pages/Categories/Categories";
import About from "./Pages/About/About";
import PrivateRoute from "./Pages/PrivateRoute/PrivateRoute";
import Profile from "./Pages/Profile/Profile";
import UpdateProfile from "./Pages/UpdateProfile/UpdateProfile";
import SinglePost from "./Pages/SinglePost/SinglePost";
import UpdatePost from "./Pages/UpdatePost/UpdatePost";
import PageNotFound from "./Pages/PageNotFound/PageNotFound";
import {useDispatch,useSelector} from "react-redux";
import { SET_POSTS } from "./redux/postsSlice";

// contexts

function App() {
   const dispatch = useDispatch();

   const fetchAllPosts = async () =>{
      try{
         const res = await axios.get("/api/posts/posts");

         if(res.status === 200){
           console.log(res)
           dispatch(SET_POSTS(res.data.posts))
         }

       }catch(error){
         console.log(error.message);
       }
   }

   useEffect(() => {
      fetchAllPosts();
   }, [dispatch])

  return (
    <div className="App">
       
       <Navbar />

       <Routes>
           <Route path="/" element={ <Home />}></Route>
           <Route path="/login" element={ <Login />}></Route>
           <Route path="/register" element={ <Register />}></Route>

           <Route path="/create-post" element={ <PrivateRoute /> }>
              <Route path="/create-post" element={ <CreatePost />}></Route>
           </Route>

           <Route path="/update-post/:id" element={ <PrivateRoute /> }>
              <Route path="/update-post/:id" element={ <UpdatePost />}></Route>
           </Route>

           <Route path="/profile/:id" element={ <PrivateRoute /> }>
              <Route path="/profile/:id" element={ <Profile />}></Route>
           </Route>
          
           <Route path="/about" element={ <PrivateRoute /> }>
              <Route path="/about" element={ <About />}></Route>
           </Route>

           <Route path="/categories" element={ <PrivateRoute /> }>
             <Route path="/categories" element={ <Categories />}></Route>
           </Route>

           <Route path="/update-profile" element={ <PrivateRoute /> }>
              <Route path="/update-profile" element={ <UpdateProfile />}></Route>
           </Route>

           <Route path="/post/:id" element={ <PrivateRoute /> }> 
              <Route path="/post/:id" element={ <SinglePost />}></Route>
           </Route>

           <Route path="*" element={<PageNotFound />} />
       </Routes>


    </div>
  );
}

export default App;
