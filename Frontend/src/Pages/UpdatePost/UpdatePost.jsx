import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import Loader from "../Loader/Loader";
import "./UpdatePost.css";
import { usePostsContext } from "../../hooks/usePostsContext";
// import CircularLoader from "../../Components/CircularLoader/CircularLoader";

const UpdatePost = () => {
  const {posts, dispatch} = usePostsContext();
  const [post, setPost] = useState({});

  const { id } = useParams();
  console.log(id);


  const navigate = new useNavigate();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("Sports");
  // const [posting, setPosting] = useState(false);
  let [blogImage, setBlogImage] = useState([]);
  const [prevImage, setPrevImage] = useState([]);

  // handle form submit
  const handleFormSubmit = (e) => {
    e.preventDefault();

    let formdata = new FormData();

    formdata.append("title", title);
    formdata.append("description", description);
    formdata.append("category", category);
    formdata.append("blogImage", blogImage);

    axios
      .patch(`/api/posts/update-post/${id}`, formdata, {
        headers: {
          "Content-type": "multipart/form-data",
        },
      })
      .then((res) => {
        if (res.status === 200) {
          console.log(res.data.post);
          Swal.fire("Greate", res.data.msg, "success");
          dispatch({type : "UPDATE_POST", payload : res.data.post})

          // setPosting(false);
          navigate("/", { replace: true });
        } else {
          console.log("Something wents wrong");
          Swal.fire("Oops", res.data.msg, "info");
        }
      })
      .catch((error) => {
        console.log(error);
        Swal.fire("Oops", "Something wents wrong", "info");
      });
  };

  const handlePostingLoading = () => {
    // setPosting(true);
  };

  // useEffect(() => {

  //  const tempPost = posts ? 
  //  posts.map((post)=>{
  //        if(post._id === id)
  //        {
  //         return post;
  //        }
        
  //  })
  //  :
  //  ""

  //  setPost(tempPost);
  //  console.log(post)

  // }, [])

  return (
    <div className="create_post_container">
      <form encType="multipart/form-data" className="createPostForm" onSubmit={handleFormSubmit}>
        <div className="create_post_heading">
          <h2>Update Post</h2>
        </div>

        <div className="input_field">
          <label htmlFor="#">Enter post title : </label>
          <input
            type="text"
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
            }}
            placeholder="Enter the title"
            required
          />
        </div>

        <div className="input_field">
          <label htmlFor="#">Enter post description : </label>
          <textarea
            type="text"
            rows={5}
            value={description}
            onChange={(e) => {
              setDescription(e.target.value);
            }}
            placeholder="Enter the description"
            required
          />
        </div>

        <div className="input_field">
          <label htmlFor="#">Select post category : </label>
          <select
            name="cars"
            // value={category}
            onChange={(e) => {
              const selectedCategory = e.target.value;
              setCategory(selectedCategory);
            }}
          >
            <option value="sports">Sports</option>
            <option value="nature">Nature</option>
            <option value="pollution">Pollution</option>
            <option value="covid">Covid</option>
            <option value="war">War</option>
            <option value="education">Education</option>
            <option value="other">Other</option>
          </select>
        </div>

        <div className="input_field">
        <label htmlFor="#">Select post image : </label>
          <input
            type="file"
            onChange={(e) => {
              setBlogImage(e.target.files[0]);
              setPrevImage(URL.createObjectURL(e.target.files[0]));
            }}

          />
          <br />
          {/* <img width={200} height={150} src={prevImage} alt="prev image" /> */}
        </div>

        <div className="post_btn_wrapper">
          <button onClick={handlePostingLoading}>
           Update Blog
          </button>
          {/* {posting ? <>Posting... <CircularLoader /></> : ""} */}
        </div>
      </form>
    </div>
  );
};

export default UpdatePost;
