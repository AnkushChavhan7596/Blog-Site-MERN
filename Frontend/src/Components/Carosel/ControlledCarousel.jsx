import React, { useState } from "react";
import Carousel from 'react-bootstrap/Carousel';
import 'bootstrap/dist/css/bootstrap.min.css';
import { usePostsContext } from "./../../hooks/usePostsContext";
import "./ControlledCarousel.css";
import { useNavigate } from "react-router-dom";


function ControlledCarousel() {

  const navigate = useNavigate();
    
    const { posts } = usePostsContext();

    const [index, setIndex] = useState(0);
  
    const handleSelect = (selectedIndex, e) => {
      setIndex(selectedIndex);
    };
  
    return (
         <Carousel activeIndex={index} className="carousel_wrapper" onSelect={handleSelect}>

        {
          posts ? posts.map((post) => {
            return(
              <Carousel.Item key={post._id} className="carousel-item">
                <div className="item">
                    <p className="carousel_item_title">{post.title}</p>
                      
                      <div className="item_carousel_img_wrapper">
                          <img
                            className="carousel-item-image"
                            src={post.postImage}
                            alt="First slide"
                          />

                          <button className="carousel_item_btn" onClick={()=>{navigate("/login", {replace : true})}}>View Blog</button>
                      </div>
                      
                      
                      <p>{post.name}</p>
                      <p className="blog-description-carousel">{post.description}</p>

                      
                </div>
              </Carousel.Item>
            )
          })
          :
          ""
        }
       
       </Carousel>
    );
  }
  
export default ControlledCarousel;