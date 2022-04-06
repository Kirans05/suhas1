import axios from 'axios'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Emailverification = () => {
  const nav = useNavigate()
  const [responsemsg,setresponsemsg] = useState(null)
  
  const [inputvalue,setinputvalue] = useState({
    email:"",
    otp:""
  })

  const changeHandler = (e) => {
    e.preventDefault()
    setinputvalue({...inputvalue,[e.target.name]:e.target.value})
  }

  const submitHandler = async (e) => {
    e.preventDefault()
    if(inputvalue.otp == ""){
      let options = {
        url:"http://localhost:4000/emailverification",
        method:"POST",
        headers:{
          "content-type":"application/json"
        },
        data:inputvalue
      }
      let response = await axios(options)
                  if(response.data == "OTP sent"){
                    setresponsemsg("OTP sent to mail")
                  }else{
                    setresponsemsg("Some internal problem Please try again later")
                  }
    }else{
      let options = {
        url:"http://localhost:4000/otpverification",
        method:"POST",
        headers:{
          "content-type":"application/json"
        },
        data:inputvalue
      }
      let response = await axios(options)
      if(response.data == "Correct OTP"){
          setresponsemsg("correct otp")
          nav("/forgot")
      }else if(response.data == "Incorrect OTP"){
        setresponsemsg("Incorrect OTP")
      }else{
        setresponsemsg("User Does Not Exists")
      }
    }
    setTimeout(() => {
      setresponsemsg(null)
    }, 3500);
  }
  return (
    <div>
      <h6>Enter OTP to verify Your Email Id</h6>
      <form onSubmit={submitHandler}>
      <input type={"email"} placeholder="Enter Emai Id" name="email" onChange={changeHandler} required="required"/>
      <br />
      <br />
      <input type={"text"} placeholder="Enter OTP" name='otp' onChange={changeHandler} />
      <br />
      <br />
    <button>Submit</button>
      </form>
      {
        responsemsg ? <h6>{responsemsg}</h6> : null
      }
    </div>
  )
}

export default Emailverification