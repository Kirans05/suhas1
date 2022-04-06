import React from 'react'
import { NavLink } from 'react-router-dom'

const Nav = () => {
  return (
    <div>
        <NavLink to={"/"} >SignUp</NavLink>
        <NavLink to={"/login"} >Login</NavLink>
    </div>
  )
}

export default Nav