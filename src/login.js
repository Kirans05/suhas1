import React, { useState } from 'react'
import axios from "axios"
import { NavLink, useNavigate } from 'react-router-dom'

const Login = () => {
    const nav = useNavigate()
    const [responsemsg,setresponsemsg] = useState(null)
    const [inputList,setinputList] = useState({
        email:"",
        password:""
    })

    const inputChangeHandler = (e) => {
        e.preventDefault()
        setinputList({...inputList,[e.target.name]:e.target.value})
    }

    const submitHandler = async (e) => {
        e.preventDefault()
        let options = {
            url:"http://localhost:4000/login",
            method:"POST",
            headers:{
                "content-type":"application/json"
            },
            data:inputList
        }
        let response = await axios(options)
        if(response.data == "login Successfull"){
            setresponsemsg("login Successfull")
            nav("/dashboard")
        }else if(response.data == "Incorrect Password"){
            setresponsemsg("Incorrect Password")
        }else{
            setresponsemsg("EmailId does not exist")
        }
        setTimeout(() => {
            setresponsemsg(null)
        }, 3000);
    }
  return (
    <div>
        <NavLink to={"/"} >SignUp</NavLink>
        {/* <br /> */}
        <h6>Please Enter Email and Password to login</h6>
        <form onSubmit={submitHandler}>
            <input type={"email"} placeholder="Enter Email" value={inputList.email} onChange={inputChangeHandler} name="email" required="required"/>
            <br />
            <br />
            <input type={"password"} placeholder="Enter Password" value={inputList.password} onChange={inputChangeHandler} name="password" required="required"/>
            <br />
            <br />
            <NavLink to="/emailverification" >Forgot Password</NavLink>
            <br />
            <br />
            <button>Login</button>
        </form>
        {
            responsemsg ? <h6>{responsemsg}</h6> : null
        }
    </div>
  )
}

export default Login