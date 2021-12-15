import * as actionTypes from "../constants/cartConstants";

const CART_INITIAL_STATE = {
  cartItems: [],
  searchItems: [
    // {title='something',desc:"A MAN"}

    {
      createdAt: 1639039891855,
      desc: "It was a book of thriller,magic and Action.",
      id: "61b1c393ec054b955b53cab2",
      img: "http://res.cloudinary.com/debiscloud/image/upload/v1639039891/16bfe71f-0733-42a4-89b8-1d49ff0ef1cf_n7gxkn.jpg",
      price: "1080",
      title: "the girl with,out name",
      updatedAt: 1639039891855,
      userId: "61b1ad1505a9f77ae2cd6d71",
    }
  ],
  user:""
};

export const cartReducer = (state = CART_INITIAL_STATE, action) => {
  switch (action.type) {
    case actionTypes.ADD_TO_CART:
      const item = action.payload;
      console.log('In the reducer', item)
      const existItem = state.cartItems.find((x) => x.title === item.title)

      console.log("to check", existItem)
      if (existItem) {
        return {
          ...state,
          cartItems: state.cartItems.map((x) =>
            x.product === existItem.product ? item : x
          ),
        };
      } else {
        return {
          ...state,
          cartItems: [...state.cartItems, item],
        };
      }

    case actionTypes.ADD_TO_SEARCH:
      console.log('data in the reducer search', action.payload)
      const items = action.payload
      // const existItems = state.cartItems.find((cartItems) => cartItems.length==0)
      // const cartLength = cartItems.length = 1

      return {
        ...state,
        searchItems: [items, ...state.searchItems]
      }


    // }
    case actionTypes.CART_RESET:
      return {
        ...state,
        searchItems: [state.searchItems.length = 0]
      }

    case actionTypes.LOGIN:
      return{
        ...state,
        user:[...state.user,action.payload]
      }
    
    case actionTypes.LOGOUT:
      return{
        ...state,
        user:[...state.user=[]]
      }


    case actionTypes.REMOVE_FROM_CART:
      return {
        ...state,
        cartItems: state.cartItems.filter((x) => x.id !== action.payload),
      };
    default:
      return state;
  }
};
