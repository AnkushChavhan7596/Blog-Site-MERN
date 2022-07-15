import React from 'react'
import "./BeforeSignHome.css";
import ControlledCarousel from '../Carosel/ControlledCarousel';

const BeforeSignHome = () => {
  return (
    <div className='before-sing-home'>
        
        <div className="before-sign-home-heading_wrapper">
             <h2 className="before-sign-heading">
                 Do more with the things you love
             </h2>
        </div>

        <ControlledCarousel />
    </div>
  )
}

export default BeforeSignHome