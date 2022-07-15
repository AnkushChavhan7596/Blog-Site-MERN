import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import "./CreatePost.css";
import SendingLoader from "../../Components/SendingLoader/SendingLoader";

// import CircularLoader from "../../Components/CircularLoader/CircularLoader";
import { usePostsContext } from "../../hooks/usePostsContext";
import { useActiveUserContext } from "../../hooks/useActiveUserContext";

const CreatePost = () => {

  const { dispatch } = usePostsContext();
  const { activeUser } = useActiveUserContext();

  console.log(activeUser)

  const navigate = new useNavigate();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("Sports");
  // const [posting, setPosting] = useState(false);
  let [blogImage, setBlogImage] = useState([]);
  const [prevImage, setPrevImage] = useState([]);
  const [imageSelected, setImageSelected] = useState(false)
  const [sending, setSending] = useState(false);

  // handle form submit
  const handleFormSubmit = (e) => {
    e.preventDefault();

    setSending(true);

    let formdata = new FormData();

    formdata.append("title", title);
    formdata.append("description", description);
    formdata.append("category", category);
    formdata.append("blogImage", blogImage);
    formdata.append("activeUserId", activeUser._id);

    axios
      .post("/api/posts/create-post", formdata, {
        headers: {
          "Content-type": "multipart/form-data",
        },
      })
      .then((res) => {
        if (res.status === 200) {

          setSending(false);

          dispatch({type :"CREATE_POST", payload : res.data.post}); // dispathing the global posts state


          Swal.fire("Greate", res.data.msg, "success");

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

  return (
    <div className="create_post_container">
      <form encType="multipart/form-data" className="createPostForm" onSubmit={handleFormSubmit}>
        <div className="create_post_heading_wrapper">
          <h2 className="create_post_heading">Create Post</h2>
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
              setImageSelected(true);
            }}

            required
          />
          <br />
          {imageSelected ?<img className="prev-image" width={200} height={150} src={prevImage} alt="image preview" /> : ""}
        </div>

        <div className="post_btn_wrapper">
          <button onClick={handlePostingLoading}>
            create blog
          </button>
          { sending ? <SendingLoader /> : "" }
        </div>
      </form>
    </div>
  );
};

export default CreatePost;
