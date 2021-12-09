import React, { useState } from 'react'
import './register.css'
import { useHistory } from 'react-router-dom'
import axios from 'axios'

const Register = () => {
    const history = useHistory()
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
    const register = async(req, res) => {
        const { name, email, password } = user
        console.log(user)
        if (name && email && password) {
            await axios.post("http://localhost:1337/user", user)
                .then(res => {
                    alert('Registered Successfully')
                    history.push('/login')
                })
        }else{
            alert("invalid cerdential!!")
        }
    }



    return (
        <>

            <div className='regi'>
                <h3 className="text-center">Register Here</h3>
                <div class="mb-3">
                    <label for="exampleInputName" class="form-label">Name</label>
                    <input type="text" class="form-control"
                        name='name' value={user.name}
                        onChange={handleChange}></input>

                </div>
                <div class="mb-3">
                    <label for="exampleInputEmail1" class="form-label">Email address</label>
                    <input type="email" class="form-control"
                        name='email' value={user.email}
                        onChange={handleChange}
                    ></input>

                </div>
                <div class="mb-3">
                    <label for="exampleInputPassword1" class="form-label">Password</label>
                    <input type="password" class="form-control"
                        name='password' value={user.password}
                        onChange={handleChange}
                    ></input>
                </div>

                <center><button class="btn btn-primary" onClick={register}>Register</button></center>
            </div>
        </>
    )
}

export default Register
