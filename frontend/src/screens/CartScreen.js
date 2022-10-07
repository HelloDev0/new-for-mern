import "./CartScreen.css";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { useHistory } from 'react-router-dom'

// Components
import CartItem from "../components/CartItem";

// Actions
import { addToCart, removeFromCart } from "../redux/actions/cartActions";
import axios from "axios";
// import { response } from "express";


const CartScreen = () => {
  const history = useHistory()

  const dispatch = useDispatch();

  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  // const [cartproduct,setCartproduct]=useState([])
  useEffect( () => {
    // 
    const tUser = localStorage.getItem('user')
    const useri = tUser ? JSON.parse(tUser) : ''
    console.log("bjfwbjf",useri)
    const data=useri._id
    console.log("not happened",data)
     axios.get(`http://localhost:5000/api/user/cartitem/${data}` )
    .then((response) => {
      console.log('here is the data from DB', response.data);
      // setCartproduct(response.data)
    }, (error) => {
      console.log(error);
    });
  }, []);

  // console.log('hjvsfabkrfebalrk',cartproduct)


  const userId = localStorage.getItem('user')

  

  const qtyChangeHandler = (id, qty) => {
    dispatch(addToCart(id, qty));
  };

  const removeFromCartHandler = (id) => {
    dispatch(removeFromCart(id));
  };

  const getCartCount = () => {
    return cartItems.reduce((qty, item) => Number(item.qty) + qty, 0);
  };

  const getCartSubTotal = () => {
    return cartItems
      .reduce((price, item) => price + item.price * item.qty, 0)
      .toFixed(2);
  };

  const chekOut = () => {
    alert('Order Placed successfully')
    history.push('/')

  }



  return (
    <>
    {userId ?(
      <div className="cartscreen">
        <div className="cartscreen__left">
          <h2>Shopping Cart</h2>

          {cartItems.length === 0 ? (
            <div>
              Your Cart Is Empty <Link to="/">Go Back</Link>
            </div>
          ) : (
            cartItems.map((item) => (
              <CartItem
                key={item.product}
                item={item}
                qtyChangeHandler={qtyChangeHandler}
                removeHandler={removeFromCartHandler}
              />
            ))
          )}
        </div>

        <div className="cartscreen__right">
          <div className="cartscreen__info">
            <p>Subtotal ({getCartCount()}) items</p>
            <p>{getCartSubTotal()}</p>
          </div>
          <div>
            <button onClick={chekOut}>Proceed To Checkout</button>
          </div>
        </div>
      </div>
      ):(
        <div>comming soon,..</div>
      //   <div className="cartscreen">
      //   <div className="cartscreen__left">
      //     <h2>Shopping Cart</h2>

      //     {response.data.length === 0 ? (
      //       <div>
      //         Your Cart Is Empty <Link to="/">Go Back</Link>
      //       </div>
      //     ) : (
      //       response.data.map((item) => (
      //         <CartItem
      //           key={item.product}
      //           item={item}
      //           qtyChangeHandler={qtyChangeHandler}
      //           removeHandler={removeFromCartHandler}
      //         />
      //       ))
      //     )}
      //   </div>

      //   <div className="cartscreen__right">
      //     <div className="cartscreen__info">
      //       <p>Subtotal ({getCartCount()}) items</p>
      //       <p>{getCartSubTotal()}</p>
      //     </div>
      //     <div>
      //       <button onClick={chekOut}>Proceed To Checkout</button>
      //     </div>
      //   </div>
      // </div>
      )
      }
    </>
  );
};

export default CartScreen;
