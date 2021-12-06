import * as actionTypes from "../constants/cartConstants";
import axios from "axios";

export const addToCart = (id, qty) => async (dispatch, getState) => {
  const { data } = await axios.get(`http://localhost:5000/api/products/${id}`);
  const userdetail=localStorage.getItem('user')
  const userId=JSON.parse(userdetail)._id
  dispatch({
    type: actionTypes.ADD_TO_CART,
    payload: {
      product: data._id,
      name: data.name,
      imageUrl: data.imageUrl,
      price: data.price,
      countInStock: data.countInStock,
      qty,
    },
  });
console.log('here in cartaction',userId)
const cartTobe={
  userid:userId,
  countInStock:data.countInStock,
  imageUrl:data.imageUrl,
  name:data.name,
  price:data.price,
  product:data._id,
  qty}
  axios.post('http://localhost:5000/api/user/cartitem',cartTobe)

  // localStorage.setItem("cart", JSON.stringify(getState().cart.cartItems));
};

export const removeFromCart = (id) => (dispatch, getState) => {
  dispatch({
    type: actionTypes.REMOVE_FROM_CART,
    payload: id,
  });

  // localStorage.setItem("cart", JSON.stringify(getState().cart.cartItems));
};
