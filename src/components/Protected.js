import React from 'react'
import {useEffect} from "react"
import { Link, useNavigate } from 'react-router-dom'

function Protected(props) {
    const {Component}=props
    const navigate=useNavigate();
    useEffect(()=>{
        let login =localStorage.getItem('login');
      
        if(!login){
          <h1>please first Login</h1>
            navigate('/Login')
        }
    })
  return (
    <div>
    <div>Protected</div>
    <Component/>
    </div>
  )
}

export default Protected