import React from 'react'
import "./SendingLoader.css";

const SendingLoader = () => {
  return (
    <div className='sending-loader'>
        <img src={require("../../Images/Rolling-1s-200px (1).gif")} alt="loader" />
    </div>
  )
}

export default SendingLoader