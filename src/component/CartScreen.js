import axios from "axios"
import React, { useState, useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import { useHistory } from "react-router-dom"
import { removeFromCart } from "../redux/actions/cartActions"
import './CartScreen.css'


const CartScreen = () => {
    const dispatch = useDispatch()
    const history = useHistory()
    const [cart, setCart] = useState()
    const products = useSelector((state) => state.cart.cartItems)
    
    
    const removeCartHandeler = async(id,book) => {
        console.log('rmrmrmrmrmrmrmr',cart.id)
        dispatch(removeFromCart(id))
        await axios.delete(`http://localhost:1337/cart/${book.id}`)
        alert('Are you sure!!')
    
    }

    console.log("id for remove", products)

    let total = 0
    for (let i = 0; i < products.length; i++) {
        total = total + parseInt(products[i].price)

    }
    console.log('nknkknnknkknknnkknknk', total)


    useEffect(async () => {
        axios.get('http://localhost:1337/cart')
            .then((response) => {
                console.log('user id from ls', localStorage.getItem('userID'))
                console.log("response at the time of ue", response.data)
                const filterData = response.data.filter((res) => {
                    console.log('obobobobob', JSON.stringify(res.userId.id))
                    return (JSON.stringify(res)).match(localStorage.getItem('userID'))
                })

                console.log('jhvhvhhvvhvhvvhhvhvv', filterData)
                setCart(filterData)
            })


    }, [])

    const renderList = products.map((product) => {
        const { id, title, desc, img, price } = product
        console.log("data in the cartScreen", product)
        return (
            <div key={id} style={{ textAlign: "center", display: "flex", marginTop: "1rem" }}>
                <img src={img} alt={title} className='imgCart'/>
                <div className="ml-5">
                    <h5>{title}</h5>
                    <h5>{desc}</h5><br />
                    <h5>Price:Rs.{price}.00</h5>

                    {/* setMrp({price}) */}
                    <button className="btn btn-warning mx-5" style={{ height: "40px" }}
                        onClick={() => { removeCartHandeler(id) }}>Remove from cart</button>
                </div>
            </div>
        );
    })


    const checkOut = () => {
        products.map(async (product) => {
            const { id, title, desc, img, price } = product
            console.log("data in the cartScreen", product)
            const data = {
                title: product.title,
                desc: product.des,
                price: product.price,
                img: product.img,
                userId: localStorage.getItem('userID')
            }

            await axios.post(`http://localhost:1337/cart`, data)
                .then((res) => {
                    console.log('just chcekl', res.data)

                })

        })

        history.push('/')
    }


console.log('kjbkjbbjbjbjbjbjbjbjbjb',cart)

    return (

        <section className="text-center">
            <h3 className='bg-success'>Cart Items</h3>



            {cart? (
                total > 0 ? (
                    <div className='container'>
                        <div className='row'>
                            <div className="col-md">
                                {renderList}
                            </div>


                            <div className="col-md mt-5">
                                <h4>Total price = Rs.{total}.00</h4>

                                <button onClick={checkOut} className="btn btn-success m-3">Proceed to checkout</button>
                            </div>
                        </div>
                    </div>
                ) : (
                    <h4 className='text-danger mt-5 txtEmpty'>please Add some item to check the cart</h4>
                )) : (
                cart?.map((book, id) => (
                    <div key={id} style={{ textAlign: "center", display: "flex", marginTop: "1rem" }}>
                        <img src={book.img} alt={book.title} />
                        <div className="ml-5">
                            <h5>{book.title}</h5>
                            <h5>{book.desc}</h5><br />
                            <h5>Price:Rs.{book.price}.00</h5>

                            {/* setMrp({price}) */}
                            <button className="btn btn-warning mx-5" style={{ height: "40px" }}
                                onClick={() => { removeCartHandeler(id,book) }}>Remove from cart</button>
                        </div>


                        {/* <div className="col-md">
                            <h4>Total price = Rs.{total}.00</h4>

                            <button onClick={checkOut} className="btn btn-success m-5">Proceed to checkout</button>
                        </div> */}
                    </div>

                ))
            )
            }
        </section >

    )
}

export default CartScreen
