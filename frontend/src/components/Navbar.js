import "./Navbar.css";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from 'react-router-dom'
import React, { useEffect, useState } from "react";
import { userNotAuth } from "../redux/actions/userActions";
// import 'bootstrap/dist/css/bootstarp.min.css'


const Navbar = ({ click }) => {

  const history = useHistory()
  const [userDetails, setUserDetails] = useState(false)
  const tokan = React.useRef(localStorage.getItem('token'))

  const dispatch = useDispatch()
  const cart = useSelector((state) => state.cart);
  const user = useSelector(state => state.user.token)

  // console.log(user)
  const { cartItems } = cart;

  const getCartCount = () => {
    return cartItems.reduce((qty, item) => Number(item.qty) + qty, 0);
  };

  const removeUser = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    dispatch(userNotAuth())
    history.replace('/login')
    setUserDetails(!userDetails)
  }
  console.log(userDetails)
  return (
    <nav className="navbar">
      <div className="navbar__logo " onClick={() => { history.replace('/') }}>
        <h2>Fruits Shopping Cart</h2>
      </div>

      <ul className="navbar__links">
        <li>
          <Link to="/cart" className="cart__link">
            <i className="fas fa-shopping-cart"></i>
            <span>
              Cart <span className="cartlogo__badge">{getCartCount()}</span>
            </span>
          </Link>
        </li>
        <li>
          <Link to="/">Shop</Link>
        </li>
      </ul>

      {!user && <button className='btn btn-secondary' onClick={() => { history.push('./Register') }}>Register</button>}

      {!user ? (
        <div>
          <button className='btn btn-success' onClick={() => { history.push('./Login') }}>Login</button>
        </div>
      ) : (
        <button className='btn btn-danger' onClick={removeUser}>logout</button>
      )}
      <div className="hamburger__menu" onClick={click}>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </nav>

  );
};

export default Navbar;