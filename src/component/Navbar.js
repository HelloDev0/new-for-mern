import React from 'react'
import { useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import "./view.css"
const Navbar = () => {
    const history = useHistory()
    const products = useSelector((state) => state.cart.cartItems)

    console.log("in the navbar", products.length)


    const username = localStorage.getItem('user')
    console.log(typeof username)
    const viewCart = () => {
        history.push('/cart')
    }


    const logout = () => {
        localStorage.removeItem('user')
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
                        <h4 className='text-white'>Welcome {username} to our Libray</h4>
                    </ul>
                    <div class="form-inline my-2 my-lg-0">
                       <button onClick={ viewCart } className="btn_cart"> 
                       <i class="fas fa-shopping-cart text-white h3 mx-5"></i>
                        <span className='cart_number' >{products.length}</span></button>

                        <button class="btn btn-warning my-2 mx-2 my-sm-0" onClick={() => { history.push('./Register') }}>Regitser</button>
                        {!username ? (
                            <button class="btn btn-success my-2 my-sm-0" onClick={() => { history.push('./Login') }}>Login</button>
                        ) : (
                            <button class="btn btn-danger my-2 my-sm-0" onClick={logout}>Logout</button>
                        )}
                    </div>
                </div>
            </nav>
        </div>
    )
}

export default Navbar
