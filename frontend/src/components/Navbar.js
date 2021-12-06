import "./Navbar.css";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import {useHistory} from 'react-router-dom'
// import 'bootstrap/dist/css/bootstarp.min.css'


const Navbar = ({ click }) => {
  
  const history=useHistory()
  const userdetail=localStorage.getItem('token')
  console.log(userdetail)
  

    const cart = useSelector((state) => state.cart);
    const { cartItems } = cart;

    const getCartCount = () => {
        return cartItems.reduce((qty, item) => Number(item.qty) + qty, 0);
    };

    const removeUser=()=>{
      localStorage.removeItem('token')
      localStorage.removeItem('user')
    }

    return ( 
        <nav className="navbar">
      <div className="navbar__logo">
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

      <button className='btn1' onClick={()=>{history.push('./Register')}}>Register</button>

      {!userdetail ? (
            <div>
              <button className='btn1' onClick={()=>{history.push('./Login')}}>Login</button>
            </div>
          ) : (
            <button className='btn1' onClick={removeUser}>logout</button>
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