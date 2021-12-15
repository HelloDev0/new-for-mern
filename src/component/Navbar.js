import axios from 'axios'
import React, {  useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import "./view.css"
import { useDispatch } from 'react-redux'
import { addToSearch, cartReset, userLogout } from '../redux/actions/cartActions'


const Navbar = () => {
    const history = useHistory()
    const products = useSelector((state) => state.cart.cartItems)
    const dispatch = useDispatch()
    // console.log("in the navbar state is")

    const userAvail=useSelector((state)=>state.cart.user)
    console.log('objectobjectobjectobjectobjectuser',typeof userAvail)
    const username = localStorage.getItem('user')
    console.log(typeof username)
    const viewCart = () => {
        history.push('/cart')
    }


    const logout = () => {
        localStorage.removeItem('user')
        history.push('/login')
        dispatch(userLogout())
    }


    const [user, setUser] = useState({
        title: ""
    })

    // setUser(e.target.value)
    const handleChange = e => {
        const { name, value } = e.target
        setUser({
            ...user,
            [name]: value
        })
    }

    const dataSend = user.title
    const [data, setData] = useState()


    // console.log("objecthhhhh", dataSend)
    useEffect(() => {
        

        
    }, [])

    const callSearch = async () => {
        await axios.get(`http://localhost:1337/search/?q=${dataSend}`)
                .then((res) => {
                    console.log('just chcekl',res.data)
                    setData(res.data)
                })
        dispatch(addToSearch(data))
    }

    return (
        <div>
            <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
                <a class="navbar-brand" >Library App</a>
                <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>

                <div class="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul class="navbar-nav mr-auto">
                        <h4 className='text-success'>Welcome {username}  <i class="far fa-smile text-success"></i></h4>
                    </ul>

                    <div class="d-flex">
                        <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search"
                            name="title" value={user.title} onChange={handleChange}
                        ></input>
                        <button class="btn btn-outline-success mx-2"
                            onClick={callSearch}>Search</button>
                        <button className='btn btn-secondary' onClick={() => { dispatch(cartReset()) }}><i class="far fa-times-circle"></i></button>
                    </div>

                    <div class="form-inline my-2 my-lg-0" >
                        <button onClick={() => { viewCart() }} className="btn btn_cart">
                            <i class="fas fa-shopping-cart text-white h3 mx-5"><span className='cart_number' >{products.length}</span></i>
                        </button>

                        
                        {userAvail.length==0 ? (
                            <div>
                            <button class="btn btn-warning my-2 mx-2 my-sm-0" onClick={() => { history.push('./Register') }}>Regitser</button>
                            <button class="btn btn-success my-2 my-sm-0" onClick={() => { history.push('./Login') }}>Login</button>
                            </div>
                        ) : (
                            <button class="btn btn-danger my-2 my-sm-0" onClick={logout}>Logout</button>
                        )}
                    </div>
                </div>
            </nav>
        </div>
    )
}

export default Navbar;
