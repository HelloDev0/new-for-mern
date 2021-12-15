import React, { useState } from 'react'
import './register.css'
import axios from 'axios'
import { useHistory } from 'react-router'
import { useDispatch } from 'react-redux'
import { userLogin } from '../redux/actions/cartActions'

const Login = () => {
    const dispatch=useDispatch()
const history=useHistory()
const[user,setUser]=useState({
    email:'',
    password:''
})
const handleChange=e=>{
    const {name,value}=e.target
    setUser({
        ...user,
        [name]:value
    })
}
const login=async(e)=>{
    e.preventDefault();
    const {email,password}=user
    const response=await axios.post("http://localhost:1337/login",user)
    console.log(response.data)
    localStorage.setItem('userID',response.data.id)
    localStorage.setItem('user',response.data.name)
    const User=localStorage.getItem('userID')
    history.push('/')
    dispatch(userLogin(User))
}

    return (
        <>
            <form className='regi'>
            <h3 className="text-center">Login to check</h3>
                 <div class="mb-3">
                    <label for="exampleInputEmail1" class="form-label">Email address</label>
                    <input type="email" class="form-control" 
                        name='email' value={user.email}
                        onChange={handleChange}></input>
                    
                </div>
                <div class="mb-3">
                    <label for="exampleInputPassword1" class="form-label">Password</label>
                    <input type="password" class="form-control"
                    name='password' value={user.password}
                    onChange={handleChange} ></input>
                </div>
                <center><button class="btn btn-primary" onClick={login}>Login</button></center>
            </form>
        </>
    )
}

export default Login
