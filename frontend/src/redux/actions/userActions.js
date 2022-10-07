import * as actionTypes from '../constants/userConstants'

export const userAuth = (id,token) => (dispatch, getState) => {
    console.log("first",id,token)
    // return
    dispatch({
        type: actionTypes.USER_AUTHENTICATED,
        payload: {
            id:id,
            token:token
        },
    })
}

export const userNotAuth=()=>(dispatch)=>{
    dispatch({
        type:actionTypes.USER_REMOVED
    })
}