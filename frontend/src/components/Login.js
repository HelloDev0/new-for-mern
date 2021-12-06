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
                <form>
                    <h3>Login Page</h3>
                    {/* <h5>Name</h5>
            <input type='text' name="name" value={user.name} onChange={handleChange}></input> */}
                    <h5>Email</h5>
                    <input type='email' name="email" value={user.email} onChange={handleChange}></input>
                    <h5>Password</h5>
                    <input type='password' name="password" value={user.password} onChange={handleChange}></input> <br />
                    <button onClick={login}>login</button>
                </form>
            </div>
        </div>
    )
}

export default Login
