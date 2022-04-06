import axios from 'axios'
import React, { useState } from 'react'
import { NavLink } from "react-router-dom"

const Dashboard = () => {
    const [urlvalue,seturlvalue] = useState("")
    const [newurllink,setnewurllink] = useState("")

    const handleURLvalue = (e) => {
        e.preventDefault()
        seturlvalue(e.target.value)
    }
    const submitForm1 = async (e) => {
        e.preventDefault()
        let response = await axios(`https://api.shrtco.de/v2/shorten?url=${urlvalue}`)
        if(response.data.result.full_short_link){
            seturlvalue("")
            setnewurllink(response.data.result.full_short_link)
        }else{
            alert("Please check the URL")
        }
    }
  return (
    <div>
        <NavLink to="/">LogOut</NavLink>
        <h1>Welcome to Dashboard</h1>
        <h6>URL <span>SHORTNER</span></h6>
        <form onSubmit={submitForm1}>
            <input type={"text"} placeholder="Paste URL" value={urlvalue} onChange={handleURLvalue}/>
            <button>Shorten</button>
        </form>
        <br />
        <form>
            <input type={"text"} value={newurllink} placeholder="Shortened URL"/>
        </form>
    </div>
  )
}

export default Dashboard