import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import './view.css'
import { addToCart } from '../redux/actions/cartActions';

require('dotenv').config();

const View = () => {
    const dispatch=useDispatch()
    const history = useHistory()
    const [user, setUser] = useState()

    const [userdata, setUserdata] = useState()
    console.log('hello edflkemf', user)
    useEffect(() => {

        setUser(localStorage.getItem('userID'))
        axios.get('http://localhost:1337/item')
            .then((response) => {
                console.log('user id from ls', localStorage.getItem('userID'))
                console.log("response", response)
                if (localStorage.getItem('userID') === response.data[0].userId.id) {
                    setUserdata(response.data)
                }
            }, (err) => {
                console.log(err)
            })
    }, [])
    

    // useEffect(() => {
    //     if (product && match.params.id !== product._id) {
    //       dispatch(getProductDetails(match.params.id));
    //     }
    //   }, [dispatch, match, product]);
    const addToCartHandler=(book)=>{
        console.log("in the add to cart",book)
        dispatch(addToCart(book))
        alert('added to the cart')
        // console.log(userdata)
        // dispatch(addToCart(userdata.id))
        // history.push('/cart')
    }
    
    // const useridFromDB=userdata.userId.id
    console.log("object is here ", userdata)
    // console.log("kkjbkb", obj)
    // console.log(books.data)
    return (
        <div className="itemsOfUser">

            {user ? (
                userdata?.map((book, id) => (
                    <center>

                        <div class="car" key={id}>
                            
                            <img src={book.img} className="image" />
                            <div className="product_list">
                                <h6>Title: {book.title}</h6>
                            <h6>Description: {book.desc}</h6>
                            <h5>Price: Rs.{book.price}.00</h5>
                            <button onClick={()=>{
                                addToCartHandler(book)
                            }}>
                                Add to Cart</button>
                            </div>
                        </div>
                    </center>

                ))
        
            ) : (
                <center className="m-5">
                    <h3>Sorry...
                        No user logged in yet.
                    </h3>

                    <h4>Please <a className="text-success" onClick={() => { history.push('/login') }}>click here</a> to login</h4>
                </center>
            )
            }
        </div>
    )
}

export default View
