import * as actionTypes from "../constants/cartConstants";


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
export const addToSearch = (data) => async (dispatch, getState) => {

  console.log("data in the Action",data)

//  const list=data.map((x)=>{
//         const {id, title, des, img,price}=x})
//         console.log('data from map in action',list)      
  dispatch({
    type: actionTypes.ADD_TO_SEARCH,
    payload: {
      data
    },
  });

};

export const cartReset=()=>(dispatch)=>{
  dispatch({
    type:actionTypes.CART_RESET,
    
  })
}

export const userLogin=(User)=>(dispatch,getState)=>{
dispatch({
  type:actionTypes.LOGIN,
  payload:User
})
}
export const userLogout=()=>(dispatch)=>{
  dispatch({
    type:actionTypes.LOGOUT
  })
}


export const removeFromCart = (id) => (dispatch, getState) => {
  dispatch({
    type: actionTypes.REMOVE_FROM_CART,
    payload:id,
  });

  // localStorage.setItem("cart", JSON.stringify(getState().cart.cartItems));
};
