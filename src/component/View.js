import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import './view.css'
import { addToCart } from '../redux/actions/cartActions';
require('dotenv').config();



const View = () => {

    const searchedItem = useSelector((state) => state.cart.searchItems)
    const actualdata = [...searchedItem].shift()

    // const dataTobe=actualdata['data']

    console.log('hello in the view from store', actualdata)



    const dispatch = useDispatch()
    const history = useHistory()
    const [user, setUser] = useState()

    const [userdata, setUserdata] = useState()
    // console.log('hello edflkemf', user)
    const fetchDB = async () => {
        setUser(localStorage.getItem('userID'))
        await axios.get('http://localhost:1337/item')
            .then((response) => {
                console.log('user id from ls', localStorage.getItem('userID'))
                console.log("response", response.data)
                // if (localStorage.getItem('userID') === response.data[0].userId.id) {

                const filterData = response.data.filter((res) => {
                    console.log('obobobobob', JSON.stringify(res.userId))
                    return (JSON.stringify(res)).match(localStorage.getItem('userID'))
                })

                console.log('jhvhvhhvvhvhvvhhvhvv', filterData)
                setUserdata(filterData)

            }, (err) => {
                console.log(err)
            })
    }
    useEffect(() => {
        fetchDB()

    }, [])


    const addToCartHandler = (book) => {
        console.log("in the add to cart", book)
        dispatch(addToCart(book))
        // alert('added to the cart')

    }
    const [title, setTitle] = useState("")
    const [desc, setDesc] = useState("")
    const [price, setPrice] = useState("")
    const [image, setImage] = useState(null)
    const userId = localStorage.getItem('userID')


    const imageHandler = (e) => {
        const file = e.target.files[0]
        console.log('howdy', file)
        setImage(file)

    }
    const formData = new FormData()
    formData.append('image', image)
    formData.append('title', title)
    formData.append('desc', desc)
    formData.append('price', price)
    formData.append('userId', userId)



    console.log("objectobjectobject2",)

    const addBooks = async (e) => {

        console.log('howdy', image, title, desc, price, userId)

        e.preventDefault()


        console.log('bboknbnnookookookookook', formData)
        await axios.post(`http://localhost:1337/item`, formData
        )
            .then(res =>
                console.log('response from backend', res.data))

        await fetchDB()
    }

    // console.log('hello in the viw as data')
    return (
        <div className='container-fluid'>

            <div className='row'>
              <div className='col-md text-center'>
                    <button type="button" class="btn btn-primary mx-5 my-3" data-toggle="modal" data-target="#exampleModal">
                        Add Books
                    </button>
                </div>

                {/* <!-- Modal --> */}
                <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div class="modal-dialog">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h5 class="modal-title" id="exampleModalLabel">Give your details</h5>
                                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className='modal-body'>
                                <form encType="multipart/form-data" onSubmit={addBooks}>
                                    <div class="form-group">
                                        <label >Title</label>
                                        <input type="text"
                                            name='title' value={title}
                                            onChange={(e) => setTitle(e.target.value)} class="form-control"  ></input>
                                    </div>
                                    <div class="form-group">
                                        <label >Description</label>
                                        <input type="text"
                                            name='desc' value={desc}
                                            onChange={(e) => setDesc(e.target.value)} class="form-control" ></input>
                                    </div>
                                    <div class="form-group">
                                        <label >Price</label>
                                        <input type="text"
                                            name='price' value={price}
                                            onChange={(e) => setPrice(e.target.value)} class="form-control" ></input>
                                    </div>
                                    <div class="form-group">
                                        <label >Image</label>
                                        <input type="file"
                                            name='image'
                                            onChange={imageHandler} class="form-control" ></input>
                                    </div>

                                    <button class="btn btn-primary" type="submit" data-dismiss="modal">Submit</button>
                                </form>
                            </div>
                            <div class="modal-footer">
                                <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                                {/* <button type="button" class="btn btn-primary">Save changes</button> */}
                            </div>
                        </div>
                    </div>
                </div>

            </div>
            <div className="itemsOfUser row">

                {user ? (

                    searchedItem.length < 2 ? (

                        userdata?.map((book, id) => (
                            // <center>


                            <div class="car col-md-4 p-4" key={id}>

                                <img src={book.img} className="image" />
                                <div className="product_list ml-2">
                                    <h6>Title: {book.title}</h6>
                                    <h6>Description: {book.desc}</h6>
                                    <h5>Price: Rs.{book.price}.00</h5>
                                    <button onClick={() => {
                                        addToCartHandler(book)
                                    }}>
                                        Add to Cart</button>
                                </div>
                            </div>

                            // </center>

                        ))
                    ) : (
                        <div className="itemsOfUser row">

                            {searchedItem[0].data.map((book, id) => (
                                // <center>


                                <div class="car col-md-4 p-3" key={id}>

                                    <img src={book.img} className="image" />
                                    <div className="product_list">
                                        <h6>Title: {book.title}</h6>
                                        <h6>Description: {book.desc}</h6>
                                        <h5>Price: Rs.{book.price}.00</h5>
                                        <button onClick={() => {
                                            addToCartHandler(book)
                                        }}>
                                            Add to Cart</button>
                                    </div>
                                </div>


                                // </center>
                            ))
                            }
                        </div>
                    )

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

        </div>

    )
}

export default View
