"use server"
import React from 'react'
import axios from 'axios'
const Check = async() => {
    const res=await axios.get('http://localhost:8000/');
  return (
    <div>
        <h1>checking Connect</h1>
        {res && <h2>{res?.data?.message}</h2>}
    </div>

  )
}

export default Check