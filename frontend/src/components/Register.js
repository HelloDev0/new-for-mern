import React, { useState } from "react"
import "./register.css"
import {useHistory} from "react-router-dom"
import axios from "axios";

const Register = () => {
    const history =useHistory();
    const [user, setUser] = useState({
        name: "",
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
    const register = (req,res) => {
        const { name, email, password} = user
        if (name && email && password ) {
            axios.post("http://localhost:5000/api/user/register", user)
                .then(res => {
                    alert('inserted successfully')
                    history.push("/login")})
                    
        } else {
            alert("invalid input")
        }
    }

    return (
        <div className="register">
            <h3>Registration Page</h3>
            <h5>Name</h5>
            <input type='text' name="name" value={user.name} onChange={handleChange}></input>
            <h5>Email</h5>
            <input type='email' name="email" value={user.email} onChange={handleChange}></input>
            <h5>Password</h5>
            <input type='password' name="password" value={user.password} onChange={handleChange}></input> <br/>
            <button onClick={register}>Register</button>
        </div>
    )
}

export default Register
