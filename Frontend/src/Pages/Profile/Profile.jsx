import axios from "axios";
import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import "./Profile.css";
import Swal from "sweetalert2";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { useUsersContext } from "../../hooks/useUsersContext";
import { usePostsContext } from "../../hooks/usePostsContext";
import { useActiveUserContext } from "../../hooks/useActiveUserContext";

import { format } from "timeago.js";
import PageLoader from "../PageLoader/PageLoader";
import { useDispatch, useSelector } from "react-redux";
import {CURRENT_POST} from "../../redux/postsSlice";

const Profile = () => {
  const { id } = useParams();
  const { dispatch } = usePostsContext();
  const postDispatch = useDispatch();
  const { activeUser } = useActiveUserContext();
  console.log(id);
  const { users } = useUsersContext();
  const [postAuthor, setPostAuthor] = useState();
  const [profileImage, setProfileImage] = useState();

  const posts = useSelector((state)=> state.post.posts);

  // handle delete post
  const handleDelete = async (id) => {
    console.log(id);

    try {
      const res = await axios.delete(`/api/posts/delete-post/${id}`);

      if (res.status === 200) {
        console.log(res.data);
        dispatch({ type: "DELETE_POST", payload: res.data.post });
      } else {
        console.log("Post not deleted , Something wents wrong");
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  // handle form submit
  const handleSumbit = (e) => {
    e.preventDefault();
    let formdata = new FormData();

    formdata.append("profileImage", profileImage);

    axios
      .patch(`/api/auth/update-profile-image/${postAuthor?._id}`, formdata, {
        headers: {
          "Content-type": "multipart/form-data",
        },
      })
      .then((res) => {
        if (res.status === 200) {
          console.log("Profile Updated successfully");
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

  const handleCurrentPost = (currentId) => {
    postDispatch(CURRENT_POST(currentId)) 
  }

  useEffect(() => {
    const fetchPostUser = async () => {
      try {
        const res = await axios.get(`/api/auth/user/${id}`);

        if (res.status === 200) {
          setPostAuthor(res.data.user);
        } else {
          console.log("User not found");
        }
      } catch (error) {
        console.log(error.message);
      }
    };

    fetchPostUser();
  }, []);

  return (
    <>
    {
    postAuthor ?
   
    <div className="profile_user">
      <div className="profile_main_wrapper">
        <div className="top">
          <div className="left">
            <div className="profile_name font_wt_500">
              <p>{postAuthor?.name}</p>
            </div>

            <div className="profile_email font_wt_500">
              <p>{postAuthor?.email}</p>
            </div>

            <div className="joined_data font_wt_500">
              <p>Joined On : {format(postAuthor?.createdAt)}</p>
            </div>

            <div className="total_blogs font_wt_500">
              <p>
                Total Blogs :{" "}
                {
                  posts?.filter((post) => post?.authorId === postAuthor?._id)
                    .length
                }
              </p>
            </div>
          </div>

          <div className="right">
            <div className="image_wrapper">
              <img
                src={postAuthor?.profileImage}
                className="profile_user_profile_image"
                alt="profile  image"
              />
            </div>
            {activeUser?._id === postAuthor?._id ? (
              <div className="change_image_wrapper">
                <form encType="multipart/form-data" onSubmit={handleSumbit}>
                  <input
                    type="file"
                    onChange={(e) => setProfileImage(e.target.files[0])}
                    className="profile_input"
                  />

                  <div className="profile_submit_wrapper">
                    <button type="submit" className="profile_submit">
                      Change
                    </button>
                  </div>
                </form>
              </div>
            ) : (
              ""
            )}
          </div>
        </div>
        <div className="bottom">
          <div>
            <h4>All Blogs</h4>
          </div>

          <div className="blog_post_profile_wrapper">
            {posts
              ?.filter((post) => post?.authorId === id)
              ?.map((post) => {
                return (
                  <div className="blog_profile_post" key={post?._id}>
                    <img src={post?.postImage} alt="" />

                    <div className="mid__title">
                      <h3>{post?.title}</h3>
                    </div>

                    {activeUser?._id === postAuthor?._id ? (
                      <div className="bottom">
                        <span>
                          <DeleteIcon
                            className="clr"
                            onClick={() => handleDelete(post?._id)}
                          />
                        </span>
                        <span>
                          <Link to={`/update-post/${post?._id}`}>
                            <EditIcon className="clr" />
                          </Link>
                        </span>
                        <span>
                          <Link to={`/post/${post?._id}`}>
                            <RemoveRedEyeIcon className="clr" />
                          </Link>
                        </span>
                      </div>
                    ) : (
                      <div className="bottom">
                        <span>
                          <Link to={`/post/${post?._id}`} onClick={() => handleCurrentPost(post._id)}>
                            <RemoveRedEyeIcon className="clr" />
                          </Link>
                        </span>
                      </div>
                    )}
                  </div>
                );
              })}
          </div>
        </div>
      </div>
    </div>

    :
    <PageLoader />
            }
    </>
  );
};

export default Profile;
