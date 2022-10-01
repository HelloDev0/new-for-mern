import React, { useState } from 'react'
import "./register.css"
import { useHistory } from "react-router-dom"
import axios from "axios";


const Login = () => {
    const history = useHistory();
    const [user, setUser] = useState({
        email: "",
        password: ""

    })
    const handleChange = e => {
        const { name, value } = e.target
        setUser({
            ...user,
            [name]: value
        })
    }
    
    const login = async(e) => {
        e.preventDefault();
        const { email, password } = user
        const response=await axios.post("http://localhost:5000/api/user/login", user)
        setUser(response.data)
        localStorage.setItem('token',response.data.tkn)
        localStorage.setItem('user',JSON.stringify(response.data.user))
        console.log(response.data)
        history.push('/')
        // if (email && password) {
        //     axios.post("http://localhost:5000/api/user/login", user)
        //         .then(res => {
        //             alert('Logged in successfully!!')
        //             history.push("/")
        //         })
        //     console.log("hello", JSON.stringify(res))
        //     // localStorage.setItem("cart", JSON.stringify(getState().cart.cartItems));
        // } else {
        //     alert("invalid input")
        // }
    }




    return (
        <div>
            <div className="register">
                <form className='w-50 m-auto bg-secondary p-5 rounded'>
                    <h3 className='text-white'>Welcome to FruitsMarket</h3>
                    <h5 className='text-left text-white'>Email</h5>
                    <input type="email" class="form-control bg-white" name='email' onChange={handleChange}/>
                    <h5 className='text-left text-white'>Password</h5>
                    <input type="password" class="form-control bg-white" name='password' onChange={handleChange}/>
                    <button onClick={login} className="btn btn-success text-white mt-3">Login</button>
                </form>
            </div>
        </div>
    )
}

export default Login
