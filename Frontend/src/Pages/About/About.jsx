import React , { useReducer } from 'react'
import { useActiveUserContext } from '../../hooks/useActiveUserContext'

const About = () => {

  const {activeUser} = useActiveUserContext();
  return (
    <div>About
      <div>
        {activeUser ? activeUser.name : ""}
      </div>
    </div>
  )
}

export default About