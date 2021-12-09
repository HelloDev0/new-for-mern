import React, { useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import { useHistory } from "react-router-dom"
import { removeFromCart } from "../redux/actions/cartActions"
import './CartScreen.css'


const CartScreen = () => {
    const dispatch = useDispatch()
    const history = useHistory()
    // const [mrp,setMrp]=useState()
    const products = useSelector((state) => state.cart.cartItems)
    const removeCartHandeler = (id) => {
        console.log("id for remove", products)
        dispatch(removeFromCart(id))
        alert('Are you sure!!')
    }


    //    const cart=useSelector((state)=>state.cart)
    //     const {cartItems}=cart
    //     console.log('tyr to check',typeof cartItems)

    // const getSubTotal=()=>{
    //     return cartItems
    //     .reduce((price,cartItem)=>price+cartItem.price)
    //     .toFixed(2)
    // }
    // console.log("nbjbjbknknknknknknknnkknknkknknkn",getSubTotal)
    const result = products.map(p => p.price)
    console.log("vjhvjvjvjvjvjv", result)
    var total = 0
    for (let i = 0; i < result.length; i++) {
        total = total + parseInt(result[i])

    }
    console.log('nknkknnknkknknnkknknk', total)
    // const priceTotal=products.map((pro)=>{
    //     const {price}=pro
    //     const proInt=JSON.stringify(price)

    //     console.log('jhvajvkcfj,wb rf',proInt)
    //         return(
    //             proInt
    //         )
    //     // let total=0
    //     // for(let i=0,i<pro.length,i++){
    //     // total=total+proInt[i]
    //     // }

    // })

    const renderList = products.map((product) => {
        const { id, title, desc, img, price } = product
        // console.log("data in the cartScreen", products)
        return (
            <div key={id} style={{ textAlign: "center", display: "flex", marginTop: "1rem" }}>
                <img src={img} alt={title} />
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
    return (
       
        <section className="text-center">
            <h3 className='bg-success'>Cart Items</h3>

            { total>0 ?(
            <div className='container'>
                <div className='row'>
                    <div className="col-md">
                        {renderList}
                    </div>

                    
                    <div className="col-md">
                        <h4>Total price = Rs.{total}.00</h4>

                        <button onClick={() => {
                            alert('Order placed successfully')
                            history.push('/')
                        }} className="btn btn-success m-5">Proceed to checkout</button>
                        
                        
                        


                    </div>
                </div>
            </div>
            ):(
                <h4 className='text-danger mt-5 txtEmpty'>please Add some item to check the cart</h4>
            )}
        </section >

    )
}

export default CartScreen
