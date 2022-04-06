import axios from 'axios'
import React, { useState } from 'react'
import {NavLink, useNavigate} from "react-router-dom"

const ForgotPassword = () => {
    const nav = useNavigate()
    const [responsemsg,setresponsemsg] = useState(null)
    const [inputvalues,setinputvalues] = useState({
        emai:"",
        password1:"",
        password2:""
    })

    const changeHandler = (e) => {
        e.preventDefault()
        setinputvalues({...inputvalues,[e.target.name]:e.target.value})
    }

    const submitData = async (e) => {
        e.preventDefault()
        if(inputvalues.password1 == inputvalues.password2){
            let options = {
                url:"http://localhost:4000/updatepassword",
                method:"POST",
                headers:{
                    "content-type":"application/json"
                },
                data:inputvalues
            }
            let response = await axios(options)
            if(response.data == "Password Updated"){
                nav("/login")
            }else{
                setresponsemsg("User Does Not Exists")
            }

        }else{
            alert("Password Does not Match")
        }
        setTimeout(() => {
            setresponsemsg(null)
        }, 3500);
    }
  return (
    <div>
        <NavLink to="/login" >Login</NavLink>

        <h6>Password Reset</h6>


        <form onSubmit={submitData}>
            <input type={"email"} placeholder="Enter Email" value={inputvalues.email} onChange={changeHandler} name="email" required="required" />
            <br />
            <br />
            <input type={"password"} placeholder="Enter New Password" value={inputvalues.password1} onChange={changeHandler} name="password1" required="required" />
            <br />
            <br />
            <input type={"password"} placeholder="Confirm Password" value={inputvalues.password2} onChange={changeHandler} name="password2" required="required" />
            <br />
            <br />
            <button>Reset</button>
        </form>
        {
            responsemsg ? <h6>{responsemsg}</h6> : null
        }
    </div>
  )
}

export default ForgotPassword