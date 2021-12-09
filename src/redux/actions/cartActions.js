import * as actionTypes from "../constants/cartConstants";
import axios from "axios";

export const addToCart = (book) => async (dispatch, getState) => {

  console.log("data in the Action",book)

  dispatch({
    type: actionTypes.ADD_TO_CART,
    payload: {
      // userdata
      id:book.id,
      title: book.title,
      des: book.desc,
      img: book.img,
      price: book.price,
      
    },
  });

};

export const removeFromCart = (id) => (dispatch, getState) => {
  dispatch({
    type: actionTypes.REMOVE_FROM_CART,
    payload:id,
  });

  // localStorage.setItem("cart", JSON.stringify(getState().cart.cartItems));
};
